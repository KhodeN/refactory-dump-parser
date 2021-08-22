import Jimp from "jimp";
import { downloadFile, writeFile } from "./helpers";

export class IconSprite {
  public static getSize(total: number) {
    const columns = Math.floor(Math.sqrt(total));
    const rows = Math.ceil(total / columns);

    return { total: total, columns, rows, max: columns * rows };
  }

  constructor(
     private icons: Set<string>,
     private iconSize: number,
     private baseUrl: string,
     private savePath: string
  ) {
  }

  public async download() {
    // Download icons
    for (const icon of Array.from(this.icons)) {
      await downloadFile(
         `${this.baseUrl}/icons/${icon}`,
         `${this.savePath}/icons/${icon}`
      );
    }
  }

  public async generate(spriteFile: string) {
    const { columns, rows } = IconSprite.getSize(this.icons.size);
    const iconData: Record<string, { x: number; y: number }> = {};
    let i = 0;
    const width = this.iconSize * columns;
    const height = this.iconSize * rows;
    const canvas = await Jimp.read(new Jimp(width, height));
    for (const icon of Array.from(this.icons)) {
      const iconImage = await Jimp.read(`${this.savePath}/icons/${icon}`);
      await iconImage.resize(this.iconSize, this.iconSize);
      const { x, y } = this.getPosition(i, columns);

      await canvas.composite(iconImage, x, y);
      iconData[icon] = { x, y };

      i += 1;
    }

    await canvas.write(spriteFile);

    await writeFile(
       `${this.savePath}/sprite.json`,
       JSON.stringify(iconData, null, 2)
    );
  }

  private getPosition(index: number, columns: number) {
    const row = Math.floor(index / columns);
    const column = index % columns;
    return { x: column * this.iconSize, y: row * this.iconSize };
  }
}
