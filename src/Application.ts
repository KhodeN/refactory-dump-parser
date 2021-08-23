import { CsvParser } from "./CsvParser";
import { downloadFile, readFile, readJson, writeJson } from "./helpers";
import { IconSprite } from "./IconSprite";

const CSV_FILES = [
  "config_resources.csv",
  "config_research.csv",
  "config_entities.csv",
];

export class Application {
  private baseUrl = "https://re-factory.ru/files/mods/";

  private outPath = "./out";

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
    for (const file of CSV_FILES) {
      const content = await readJson(
        `${this.savePath}/${file.replace(".csv", ".json")}`
      );
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

    // Download icons
    for (const icon of Array.from(icons)) {
      await downloadFile(
        `${this.baseUrl}/icons/${icon}`,
        `${this.savePath}/icons/${icon}`
      );
    }

    const sprite = new IconSprite(icons, 64, this.savePath);
    sprite.generate(`${this.savePath}/sprite.png`);

    console.log();
  }

  private async csv2json() {
    console.log("Converting from CSV to JSON");
    console.log("SKIPPED");
    return;

    for (const file of CSV_FILES) {
      const content = await readFile(`${this.savePath}/${file}`);
      const records = CsvParser.parseFile(content);
      await writeJson(
        `${this.savePath}/${file.replace(".csv", ".json")}`,
        records
      );
    }

    console.log();
  }

  private async downloadDump() {
    console.log("Downloading dumps");
    console.log("SKIPPED");
    return;

    for (const file of CSV_FILES) {
      await downloadFile(`${this.baseUrl}/${file}`, `${this.savePath}/${file}`);
    }

    console.log();
  }
}
