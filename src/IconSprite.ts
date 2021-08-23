import Jimp from "jimp";
import { rgbaToHex, writeJson } from "./helpers";

export class IconSprite {
  public static getSize(total: number) {
    const columns = Math.floor(Math.sqrt(total));
    const rows = Math.ceil(total / columns);

    return { total: total, columns, rows, max: columns * rows };
  }

  constructor(
    private icons: Set<string>,
    private iconSize: number,
    private savePath: string
  ) {}

  public async generate(spriteFile: string) {
    const { columns, rows } = IconSprite.getSize(this.icons.size);
    const iconData: Record<string, { x: number; y: number; color: string }> =
      {};
    const width = this.iconSize * columns;
    const height = this.iconSize * rows;
    const canvas = await Jimp.read(new Jimp(width, height));

    const icons = Array.from(this.icons);
    for (let i = 0; i < icons.length; i += 1) {
      const icon = icons[i];
      const iconImage = await Jimp.read(`${this.savePath}/icons/${icon}`);
      await iconImage.resize(this.iconSize, this.iconSize);
      const { x, y } = this.getPosition(i, columns);

      await canvas.composite(iconImage, x, y);

      const color = Jimp.intToRGBA(iconImage.resize(1, 1).getPixelColor(1, 1));
      iconData[icon] = { x, y, color: rgbaToHex(color) };
    }

    await canvas.write(spriteFile);

    await writeJson(spriteFile.replace(".png", ".json"), iconData);
  }

  private getPosition(index: number, columns: number) {
    const row = Math.floor(index / columns);
    const column = index % columns;

    return { x: column * this.iconSize, y: row * this.iconSize };
  }
}
