import { Item } from "../fl-models/Item";
import { parseNote } from "../helpers";
import { BaseEntity } from "./BaseEntity";
import { Barrack } from "./entities/Barrack";
import { Bomb } from "./entities/Bomb";
import { BuildingYard } from "./entities/BuildingYard";
import { Bullet } from "./entities/Bullet";
import { Droid } from "./entities/Droid";
import { Drone } from "./entities/Drone";
import { Electricity } from "./entities/Electricity";
import { Enemy } from "./entities/Enemy";
import { Factory } from "./entities/Factory";
import { Ground } from "./entities/Ground";
import { Hill } from "./entities/Hill";
import { Logistic } from "./entities/Logistic";
import { Meteorite } from "./entities/Meteorite";
import { Mill } from "./entities/Mill";
import { Mine } from "./entities/Mine";
import { Mine2 } from "./entities/Mine2";
import { Mining } from "./entities/Mining";
import { Obstacle } from "./entities/Obstacle";
import { Other } from "./entities/Other";
import { Platform } from "./entities/Platform";
import { Spaceport } from "./entities/Spaceport";
import { Storage } from "./entities/Storage";
import { Turret } from "./entities/Turret";
import { SpriteData } from "./SpriteData";

export type RawEntity =
  | Barrack
  | Bomb
  | BuildingYard
  | Bullet
  | Droid
  | Drone
  | Electricity
  | Enemy
  | Factory
  | Ground
  | Hill
  | Logistic
  | Meteorite
  | Mill
  | Mine
  | Mine2
  | Mining
  | Obstacle
  | Other
  | Platform
  | Spaceport
  | Storage
  | Turret;
type ProductionEntity = Mining | Factory | Mill;

export class Entity extends BaseEntity {
  public id: string;

  public name: string;

  constructor(private raw: RawEntity, spriteData: SpriteData) {
    super();

    this.id = raw.Sid;
    const { icon, enTitle } = parseNote(raw.Note);

    this.name = enTitle;

    this.setIcon(this.id, icon, spriteData);

    this.parseSort(raw.Sort);
  }

  public toItem(): Item {
    const item: Item = {
      id: this.id,
      name: this.name,
      category: "entities",
      stack: 1, // not actual for the game
      row: this.row,
    };

    // belts
    if (this.id === "belt.belt1") {
      item.belt = {
        speed: 3, // 180 items/m
      };
    }

    if (this.id === "belt.belt2") {
      item.belt = {
        speed: 6, // 360 items/m
      };
    }

    if (this.id === "belt.belt3") {
      item.belt = {
        speed: 12, // 720 items/m
      };
    }

    // factories
    const productionGroup = this.getProductionGroup();
    if (productionGroup) {
      const productionRawEntity = this.raw as ProductionEntity;
      item.factory = {
        type: "electric",
        mining: this.id.startsWith("mining") ? true : undefined,
        speed: parseInt(productionRawEntity.SpeedScale, 10),
        category: productionGroup,
        modules: 0,
        usage: parseInt(productionRawEntity.ElectricityConsumption, 10),
      };
    }

    // drones
    if (this.id === "sawmill.drone1") {
      item.factory = {
        type: "electric",
        speed: 1,
        category: "drones",
        modules: 0,
        usage: 10,
      };
    }

    return item;
  }

  public getProductionGroup() {
    const productionRawEntity = this.raw as ProductionEntity;

    return productionRawEntity.ProductionGroup;
  }
}
