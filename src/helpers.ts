import fs from "fs";
import fetch from "node-fetch";

export async function downloadFile(url: string, savePath: string) {
  const resp = await fetch(url);
  const dest = fs.createWriteStream(savePath);
  resp.body.pipe(dest);

  console.log(`"${savePath}" downloaded`);
}
