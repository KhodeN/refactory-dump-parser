import { CsvParser } from "./CsvParser";
import { downloadFile, readFile, writeFile } from "./helpers";
import { IconSprite } from "./IconSprite";

const FILES = [
  "config_resources.csv",
  "config_research.csv",
  "config_entities.csv",
];

export class Application {
  private baseUrl = "https://re-factory.ru/files/mods/";

  private savePath = "./in";

  public async run() {
    await this.downloadDump();
    await this.csv2json();
    await this.createIconSprite();
    await this.convertToFactorioLabFormat();
  }

  private async convertToFactorioLabFormat() {
    console.warn("TODO `convertToFactorioLabFormat` not implemented");
  }

  private async createIconSprite() {
    console.log("Creating icon sprite");
    console.log("SKIPPED");
    return;

    const icons = new Set<string>();

    // Parse icons
    for (const file of FILES) {
      const raw = await readFile(
        `${this.savePath}/${file.replace(".csv", ".json")}`
      );
      const content = JSON.parse(raw);
      for (const record of content) {
        const note = record.Note || record.note || "";
        const parts = note.split("|");
        if (parts.length === 3) {
          const [icon, ruTitle, enTitle] = parts;
          if (icon.endsWith(".png")) {
            icons.add(icon);
          }
        }
      }
    }

    const sprite = new IconSprite(icons, 64, this.baseUrl, this.savePath);
    sprite.download();
    sprite.generate(`${this.savePath}/sprite.png`);

    console.log();
  }

  private async csv2json() {
    console.log("Converting from CSV to JSON");
    console.log("SKIPPED");
    return;

    for (const file of FILES) {
      const content = await readFile(`${this.savePath}/${file}`);
      const records = CsvParser.parseFile(content);
      await writeFile(
        `${this.savePath}/${file.replace(".csv", ".json")}`,
        JSON.stringify(records, null, 2)
      );
    }

    console.log();
  }

  private async downloadDump() {
    console.log("Downloading dumps");
    console.log("SKIPPED");
    return;

    for (const file of FILES) {
      await downloadFile(`${this.baseUrl}/${file}`, `${this.savePath}/${file}`);
    }

    console.log();
  }
}
