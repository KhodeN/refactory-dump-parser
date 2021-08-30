import { Icon } from "../fl-models/Icon";
import { Item } from "../fl-models/Item";
import { ItemId } from "../fl-models/ItemId";
import { Recipe } from "../fl-models/Recipe";
import { parseNote } from "../helpers";
import { pos, SpriteData } from "./SpriteData";

export interface RawResource {
  heat_energy: string;
  min_required: string;
  note: string;
  recipe1_count: string;
  recipe1_duration: string;
  recipe1_group: string;
  recipe1_research: string;
  recipe1_sources: string;
  recipe2_count: string;
  recipe2_duration: string;
  recipe2_group: string;
  recipe2_research: string;
  recipe2_sources: string;
  sid: string;
  sort: string;
}

export class Resource {
  public id: string;

  public name: string;

  public icon: Icon | null = null;

  constructor(private raw: RawResource, spriteData: SpriteData) {
    this.id = raw.sid;

    const { icon, enTitle } = parseNote(raw.note);

    this.name = enTitle;

    if (icon) {
      const spriteIcon = spriteData[icon];
      if (spriteIcon) {
        this.icon = {
          color: spriteIcon.color,
          id: this.id,
          position: `${pos(spriteIcon.x)}px ${pos(spriteIcon.y)}px`,
        };
      }
    }
  }

  public toItem(): Item {
    const [row, column] = this.raw.sort.split(".");

    return {
      id: this.id,
      name: this.name,
      category: "resources",
      stack: 1, // TODO ?
      row: parseInt(row, 10),
    };
  }

  public toRecipes(productionGroupsMap: Map<string, string[]>): Recipe[] {
    const recipe1 = this.parseRecipe(
      this.raw.recipe1_group,
      this.raw.recipe1_count,
      this.raw.recipe1_duration,
      this.raw.recipe1_sources,
      productionGroupsMap,
      false
    );

    const recipe2 = this.parseRecipe(
      this.raw.recipe2_group,
      this.raw.recipe2_count,
      this.raw.recipe2_duration,
      this.raw.recipe2_sources,
      productionGroupsMap,
      true
    );

    return [recipe1, recipe2].filter(Boolean).map((r) => r!);
  }

  private parseRecipe(
    group: string,
    count: string,
    duration: string,
    sources: string,
    productionGroupMap: Map<string, string[]>,
    isAlternative: boolean
  ): Recipe | null {
    if (!group || group.startsWith("!")) {
      return null;
    }

    const producers = productionGroupMap.get(group)!;
    if (!producers) {
      console.warn("Not producers for", group, this.toItem());
    }

    const recipe: Recipe = {
      id: this.id + (isAlternative ? "_alternative" : ""),
      name: this.name + (isAlternative ? " alternative" : ""),
      producers: producers,
      time: parseInt(duration, 10),
      in: parseSources(sources),
    };

    if (count !== "1") {
      recipe.out = {
        [this.id]: parseInt(count, 10),
      };
    }

    return recipe;
  }
}

function parseSources(source: string): Record<ItemId, number> {
  // Glass*1;Plastic*1
  const parts = source.split(";");

  return parts.reduce((acc, part) => {
    const [itemId, countRaw] = part.split("*");
    if (itemId !== "Mining") {
      acc[itemId] = parseInt(countRaw, 10);
    }

    return acc;
  }, {} as Record<ItemId, number>);
}
