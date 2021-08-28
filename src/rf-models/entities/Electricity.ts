interface Electricity1 {
  ConnectRadius: string;
  Ingredients: string;
  MaxHp: string;
  Note: string;
  Research: string;
  Sid: string;
  Sort: string;
}

interface Electricity2 {
  DurationSeconds: string;
  ElectricityPower: string;
  Ingredients: string;
  MaxHp: string;
  NeedHeatEnergy: string;
  NeedWater: string;
  Note: string;
  Research: string;
  Sid: string;
  Sort: string;
  SpeedScale: string;
}

interface Electricity3 {
  ElectricityPower: string;
  Ingredients: string;
  MaxHp: string;
  MinDistanceBetweenWindmills: string;
  Note: string;
  Research: string;
  Sid: string;
  Sort: string;
  SpeedScale: string;
}

interface Electricity4 {
  ElectricityPower: string;
  Ingredients: string;
  MaxHp: string;
  Note: string;
  Research: string;
  Sid: string;
  Sort: string;
  SpeedScale: string;
}

interface Electricity5 {
  Damage: string;
  ElectricityConsumption: string;
  ElectricityPower: string;
  ExplosionRadius: string;
  Ingredients: string;
  MaxHp: string;
  MaxWorkTime: string;
  Note: string;
  Research: string;
  Sid: string;
  Sort: string;
  UpgradeToTrapSid: string;
}

interface Electricity6 {
  ElectricityConsumption: string;
  Ingredients: string;
  MaxHp: string;
  Note: string;
  Research: string;
  Sid: string;
  Sort: string;
}

export type Electricity =
  | Electricity1
  | Electricity2
  | Electricity3
  | Electricity4
  | Electricity5
  | Electricity6;
