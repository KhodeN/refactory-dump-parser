import { Defaults } from "./fl-models/Defaults";
import { FactorioLabData } from "./fl-models/FactorioLabData";
import { Icon } from "./fl-models/Icon";
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
    const productionGroups = Array.from(
      new Set(
        this.entities.reduce((acc, e) => {
          const pg = e.getProductionGroup();
          if (pg) {
            acc.push(pg);
          }

          return acc;
        }, [] as string[])
      )
    );

    const productionGroupsMap = new Map<string, string[]>(
      productionGroups.map((group) => [
        group,
        this.entities.reduce((acc, e) => {
          const pg = e.getProductionGroup();
          if (pg === group) {
            acc.push(e.id);
          }

          return acc;
        }, [] as string[]),
      ])
    );
    productionGroupsMap.set("SawmillDrone", ["sawmill.drone1"]);
    productionGroupsMap.set("BuildingYardDrone", ["sawmill.drone1"]);

    const recipes = this.resources
      .map((r) => r.toRecipes(productionGroupsMap))
      .flat();

    const producers = new Set(recipes.map((r) => r.producers).flat());
    const directAddEntities = new Set(["belt.belt1"]);

    const productionEntities = this.entities.filter(
      (e) => producers.has(e.id) || directAddEntities.has(e.id)
    );

    productionEntities.push(
      new Entity(
        {
          Sid: "belt.belt2",
          Note: "Belt2.png|Конвейер (ур. 2)|Сonveyor (lvl. 2)",
          Sort: "3.01",
          Research: "",
          Ingredients: "IronDetails*1",
          MaxHp: "1",
          MaxBeltLength: "",
        },
        this.spriteData
      ),
      new Entity(
        {
          Sid: "belt.belt3",
          Note: "Belt3.png|Конвейер (ур. 3)|Сonveyor (lvl. 3)",
          Sort: "3.01",
          Research: "",
          Ingredients: "IronDetails*1",
          MaxHp: "1",
          MaxBeltLength: "",
        },
        this.spriteData
      )
    );

    const constructorEntityId = "constructor.1";
    const defaults: Defaults = {
      // beacon: "",
      // beaconModule: "",
      // cargoWagon: "",
      disabledRecipes: recipes
        .filter((r) => r.id.endsWith("_alternative"))
        .map((r) => r.id),
      // fluidWagon: "",
      fuel: "CarbonBrick",
      maxBelt: "belt.belt3",
      maxFactoryRank: [constructorEntityId],
      minBelt: "belt.belt1",
      minFactoryRank: [constructorEntityId],
      modIds: [],
      moduleRank: [],
    };

    const resourceIcons = this.resources
      .filter((r) => r.icon)
      .map((r) => r.icon!);

    const resourcesCategoryIcon = resourceIcons.find(
      (i) => i.id === "Electronic"
    )!;
    const entitiesCategoryIcon = this.entities.find(
      (e) => e.id === constructorEntityId
    )!;

    const categoryIcons: Icon[] = [
      { ...resourcesCategoryIcon, id: "resources" },
      { ...entitiesCategoryIcon.icon!, id: "entities" },
    ];

    return {
      categories: [
        { id: "resources", name: "Resources" },
        { id: "entities", name: "Entities" },
      ],
      defaults: defaults,
      icons: [
        ...resourceIcons,
        ...productionEntities.map((e) => e.icon!),
        ...categoryIcons,
      ],
      items: [
        ...this.resources
          // .filter((r) => r.toRecipes(productionGroupsMap).length > 0)
          .sort((a, b) => (a.weight > b.weight ? 1 : -1))
          .map((r) => r.toItem()),
        ...productionEntities
          .sort((a, b) => {
            if (a.weight === b.weight) {
              return a.id > b.id ? 1 : -1;
            }

            return a.weight > b.weight ? 1 : -1;
          })
          .map((e) => e.toItem()),
      ],
      limitations: { "productivity-module": [] },
      recipes,
    };
  }
}
