import { Barrack } from "./entities/Barrack";
import { Bomb } from "./entities/Bomb";
import { BuildingYard } from "./entities/BuildingYard";
import { Bullet } from "./entities/Bullet";
import { Droid } from "./entities/Droid";
import { Drone } from "./entities/Drone";
import { Electricity } from "./entities/Electricity";
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

export class Entity {
  public id: string;

  constructor(private raw: RawEntity, private spriteData: SpriteData) {
    this.id = raw.Sid;
  }
}
