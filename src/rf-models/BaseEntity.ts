import { Icon } from "../fl-models/Icon";
import { pos, SpriteData } from "./SpriteData";

export abstract class BaseEntity {
  public column = 0;

  public icon: Icon | null = null;

  public row = 0;

  public weight = 0;

  protected parseSort(sort: string) {
    const [row, column] = sort.split(".").map((p) => parseInt(p, 10));
    this.row = row;
    this.column = column;
    this.weight = row * 1000 + column;
  }

  protected setIcon(id: string, icon: string | null, spriteData: SpriteData) {
    if (!icon) {
      return;
    }

    const spriteIcon = spriteData[icon];
    if (!spriteIcon) {
      return;
    }

    this.icon = {
      color: spriteIcon.color,
      id,
      position: `${pos(spriteIcon.x)}px ${pos(spriteIcon.y)}px`,
    };
  }
}
