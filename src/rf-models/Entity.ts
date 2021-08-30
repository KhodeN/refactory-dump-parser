import { Icon } from "../fl-models/Icon";
import { Item } from "../fl-models/Item";
import { parseNote } from "../helpers";
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
import { pos, SpriteData } from "./SpriteData";

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

export class Entity {
  public id: string;

  public name: string;

  public icon: Icon | null = null;

  constructor(private raw: RawEntity, private spriteData: SpriteData) {
    this.id = raw.Sid;
    const { icon, enTitle } = parseNote(raw.Note);

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
    const [row, column] = this.raw.Sort.split(".");

    const item: Item = {
      id: this.id,
      name: this.name,
      category: "entities",
      stack: 1, // TODO ?
      row: parseInt(row, 10),
    };

    // for belts
    if (this.id.includes("belt")) {
      item.belt = {
        speed: 3,
      };
    }

    const productionGroup = this.getProductionGroup();
    if (productionGroup) {
      const productionRawEntity = this.raw as ProductionEntity;
      item.factory = {
        type: "electric",
        speed: parseInt(productionRawEntity.SpeedScale, 10),
        category: productionGroup,
        modules: 0,
        usage: 10,
      };
    }

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
