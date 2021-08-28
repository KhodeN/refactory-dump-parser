interface Other1 {
  ElectricityConsumption: string;
  Ingredients: string;
  MaxHp: string;
  Note: string;
  Research: string;
  Sid: string;
  Sort: string;
}

interface Other2 {
  DestroyedSid: string;
  DiscoverPointsPerSecond: string;
  ElectricityConsumption: string;
  Ingredients: string;
  MaxHp: string;
  MeteoriteAlertSeconds: string;
  Note: string;
  Radius: string;
  Research: string;
  Sid: string;
  Sort: string;
}

interface Other3 {
  Note: string;
  Research: string;
  Sid: string;
  Sort: string;
}

export type Other = Other1 | Other2 | Other3;
