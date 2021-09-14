import { CsvParser } from "./CsvParser";
import {
  copyFile,
  downloadFile,
  logAsyncMethod,
  parseNote,
  readFile,
  readJson,
  writeJson,
} from "./helpers";
import { IconSprite } from "./IconSprite";
import { Store } from "./Store";

const CSV_FILES = [
  "config_resources.csv",
  "config_research.csv",
  "config_entities.csv",
];

const JSON_FILES = [
  "config_resources.json",
  "config_research.json",
  "config_entities.json",
];

export class Application {
  private baseUrl = "https://re-factory.ru/files/mods/";

  private outPath = "./out";

  private savePath = "./in";

  @logAsyncMethod("Application:")
  public async run() {
    // await this.downloadDump();
    // await this.csv2json();
    // await this.downloadIcons();
    // await this.createIconSprite();
    await this.convertToFactorioLabFormat();

    console.log(`\nDone. Files are available in ${this.outPath}`);
  }

  private async _getIconsFromDump() {
    const icons = new Set<string>();

    // Parse icons
    for (const file of JSON_FILES) {
      const content = await readJson(`${this.savePath}/${file}`);
      for (const record of content) {
        const { icon } = parseNote(record.Note || record.note || "");
        if (icon) {
          icons.add(icon!); // TODO why nullable?
        }
      }
    }

    return icons;
  }

  @logAsyncMethod("Converting to FactorioLab")
  private async convertToFactorioLabFormat() {
    const [resources, research, entities] = await Promise.all(
      JSON_FILES.map((file) => readJson(`${this.savePath}/${file}`))
    );

    const icons = await readJson(`${this.savePath}/sprite.json`);
    const store = new Store(resources, research, entities, icons);

    await writeJson(`${this.outPath}/data.json`, store.toJSON());
    await copyFile(`${this.savePath}/sprite.png`, `${this.outPath}/icons.png`);
  }

  @logAsyncMethod("Creating icon sprite")
  private async createIconSprite() {
    const icons = await this._getIconsFromDump();
    const sprite = new IconSprite(icons, 64, this.savePath);
    await sprite.generate(`${this.savePath}/sprite.png`);
  }

  @logAsyncMethod("Converting from CSV to JSON")
  private async csv2json() {
    for (const file of CSV_FILES) {
      const content = await readFile(`${this.savePath}/${file}`);
      const records = CsvParser.parseFile(content);
      await writeJson(
        `${this.savePath}/${file.replace(".csv", ".json")}`,
        records
      );
    }
  }

  @logAsyncMethod("Downloading dumps")
  private async downloadDump() {
    for (const file of CSV_FILES) {
      await downloadFile(`${this.baseUrl}/${file}`, `${this.savePath}/${file}`);
    }
  }

  @logAsyncMethod("Download icons")
  private async downloadIcons() {
    const icons = await this._getIconsFromDump();

    // Download icons
    for (const icon of Array.from(icons)) {
      await downloadFile(
        `${this.baseUrl}/icons/${icon}`,
        `${this.savePath}/icons/${icon}`
      );
    }
  }
}
