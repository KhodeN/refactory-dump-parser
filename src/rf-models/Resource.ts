import { SpriteData } from "./SpriteData";

export interface RawResource {
  heat_energy: string;
  min_required: string;
  note: string;
  recipe1_count: string;
  recipe1_duration: string;
  recipe1_group: string;
  recipe1_research: string;
  recipe1_sources: string;
  recipe2_count: string;
  recipe2_duration: string;
  recipe2_group: string;
  recipe2_research: string;
  recipe2_sources: string;
  sid: string;
  sort: string;
}

export class Resource {
  public id: string;

  constructor(private raw: RawResource, private spriteData: SpriteData) {
    this.id = raw.sid;
  }
}
