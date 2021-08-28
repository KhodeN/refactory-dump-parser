import { SpriteData } from "./SpriteData";

export interface RawResearch {
  duration: string;
  effect: string;
  ingredients: string;
  need_research: string;
  note: string;
  percent: string;
  position: string;
  sid: string;
  tab: string;
  unavailable: string;
}

export class Research {
  public id: string;

  constructor(private raw: RawResearch, private spriteData: SpriteData) {
    this.id = raw.sid;
  }
}
