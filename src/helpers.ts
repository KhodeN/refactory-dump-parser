import fs from "fs";
import fetch from "node-fetch";

export async function downloadFile(url: string, savePath: string) {
  const resp = await fetch(url);
  const dest = fs.createWriteStream(savePath);
  resp.body.pipe(dest);

  console.log(`"${savePath}" downloaded`);
}

export async function readFile(savePath: string) {
  return fs.readFileSync(savePath, { encoding: "utf-8" });
}

export async function writeFile(savePath: string, content: string) {
  fs.writeFileSync(savePath, content, { encoding: "utf-8" });
}
