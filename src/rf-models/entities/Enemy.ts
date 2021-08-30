interface Enemy1 {
  BirthBotPeriod: string;
  BotSid: string;
  DigInResources: string;
  MaxBots: string;
  MaxHp: string;
  Note: string;
  Sid: string;
  Sort: string;
}

interface Enemy2 {
  AttackDamage: string;
  BirthBotPeriod: string;
  BotSid: string;
  DamageForReduce: string;
  DismantlingResources: string;
  GooGrowSpeed: string;
  GooMaxRadius: string;
  MaxHp: string;
  Note: string;
  Sid: string;
  Sort: string;
}

interface Enemy3 {
  AggroRadius: string;
  AttackDamage: string;
  AttackDistance: string;
  Bullet: string;
  CooldownAfterShot: string;
  MaxHp: string;
  Note: string;
  Power: string;
  Sid: string;
  Sort: string;
  SpeedScale: string;
}

interface Enemy4 {
  BirthBotPeriod: string;
  BotSid: string;
  ElectricityConsumption: string;
  Ingredients: string;
  MaxHp: string;
  Note: string;
  Research: string;
  ResearchSampler: string;
  ResourcesProduct: string;
  ResourcesToUpload: string;
  Sid: string;
  Sort: string;
  WorkingDuration: string;
}

interface Enemy5 {
  Damage: string;
  ElectricityConsumption: string;
  ExplosionRadius: string;
  Note: string;
  SecondsToExplosion: string;
  Sid: string;
  Sort: string;
  SpeedScale: string;
}

export type Enemy = Enemy1 | Enemy2 | Enemy3 | Enemy4 | Enemy5;
