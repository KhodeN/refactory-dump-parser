import * as fs from "fs";
import fetch from "node-fetch";

export class Application {
    private baseUrl = "https://re-factory.ru/files/mods/";
    private savePath = "./in";

    public async run() {
        await this.downloadDump();
        await this.csv2json();
        await this.createIconSprite();
        await this.convertToFactorioLabFormat();
    }

    private async downloadDump() {
        console.log('Downloading dumps');
        console.log('SKIPPED');
        return;

        const files = [
            "config_resources.csv",
            "config_research.csv",
            "config_entities.csv",
        ];

        for (const file of files) {
            const resp = await fetch(`${this.baseUrl}/${file}`);
            const savePath = `${this.savePath}/${file}`;
            const dest = fs.createWriteStream(savePath);
            resp.body.pipe(dest);

            console.log(`"${savePath}" downloaded`)
        }

        console.log();
    }

    private async csv2json() {
        console.warn("TODO `csv2json` not implemented");
    }

    private async createIconSprite() {
        console.warn("TODO `createIconSprite` not implemented");
    }

    private async convertToFactorioLabFormat() {
        console.warn("TODO `convertToFactorioLabFormat` not implemented");
    }
}
