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
        this.entities
          .filter((e) => e.getProductionGroup())
          .map((e) => e.getProductionGroup())
      )
    );

    const productionGroupsMap = new Map<string, string[]>(
      productionGroups.map((group) => {
        return [
          group,
          this.entities
            .filter((e) => e.getProductionGroup() === group)
            .map((e) => e.id),
        ];
      })
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
    const defaults: Defaults = {
      // beacon: "",
      // beaconModule: "",
      // cargoWagon: "",
      disabledRecipes: recipes
        .filter((r) => r.id.endsWith("_alternative"))
        .map((r) => r.id),
      // fluidWagon: "",
      // fuel: "",
      maxBelt: "belt.belt1",
      maxFactoryRank: ["constructor.1"],
      minBelt: "belt.belt1",
      minFactoryRank: ["constructor.1"],
      modIds: [],
      // moduleRank: [],
    };

    const resourceIcons = this.resources
      .filter((r) => r.icon)
      .map((r) => r.icon!);

    const ironPlateIcon = resourceIcons.find((ri) => ri.id === "IronPlate")!;
    const constructorEntity = this.entities.find(
      (e) => e.id === "constructor.1"
    )!;

    const categoryIcons: Icon[] = [
      { ...ironPlateIcon, id: "resources" },
      { ...constructorEntity.icon!, id: "entities" },
    ];

    return {
      categories: [
        {
          id: "resources",
          name: "Resources",
        },
        {
          id: "entities",
          name: "Entities",
        },
      ],
      defaults: defaults,
      icons: [
        ...resourceIcons,
        ...productionEntities.map((e) => e.icon!),
        ...categoryIcons,
      ],
      items: [
        ...this.resources
          .filter((r) => r.toRecipes(productionGroupsMap).length > 0)
          .map((r) => r.toItem()),
        ...productionEntities.map((e) => e.toItem()),
      ],
      limitations: { "productivity-module": [] },
      recipes,
    };
  }
}
