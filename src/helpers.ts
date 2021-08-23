import type { RGBA } from "@jimp/core/types/etc";
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

export async function readJson(file: string) {
  return JSON.parse(await readFile(file));
}

async function writeFile(savePath: string, content: string) {
  fs.writeFileSync(savePath, content, { encoding: "utf-8" });
}

export async function writeJson(file: string, data: any) {
  await writeFile(file, JSON.stringify(data, null, 2));
}

export function rgbaToHex(color: RGBA): string {
  const hex = (c: number) => c.toString(16);
  const parts = [color.r, color.g, color.b, color.a];

  return `#${parts.map(hex)}`;
}
