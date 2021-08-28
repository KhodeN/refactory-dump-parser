import { Defaults } from "./fl-models/Defaults";
import { FactorioLabData } from "./fl-models/FactorioLabData";
import { Entity, RawEntity } from "./rf-models/Entity";
import { RawResearch, Research } from "./rf-models/Research";
import { RawResource, Resource } from "./rf-models/Resource";
import { SpriteData } from "./rf-models/SpriteData";

export class Store {
  public entities: Entity[];

  public research: Research[];

  public resources: Resource[];

  constructor(
    rawResources: RawResource[],
    rawResearch: RawResearch[],
    rawEntities: RawEntity[],
    private spriteData: SpriteData
  ) {
    this.resources = rawResources.map((raw) => new Resource(raw, spriteData));
    this.research = rawResearch.map((raw) => new Research(raw, spriteData));
    this.entities = rawEntities.map((raw) => new Entity(raw, spriteData));
  }

  public toJSON(): FactorioLabData {
    const defaults: Defaults = {
      beacon: "",
      beaconModule: "",
      cargoWagon: "",
      disabledRecipes: [],
      fluidWagon: "",
      fuel: "",
      maxBelt: "belt.belt1",
      maxFactoryRank: ["factoroy"],
      minBelt: "belt.belt1",
      minFactoryRank: ["factory"],
      modIds: [],
      moduleRank: [],
    };

    return {
      categories: [],
      defaults: defaults,
      icons: [],
      items: [],
      limitations: { "productivity-module": [] },
      recipes: [],
    };
  }
}
