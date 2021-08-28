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

export async function copyFile(from: string, to: string) {
  fs.copyFileSync(from, to);
}

export function rgbaToHex(color: RGBA): string {
  const hex = (c: number) => c.toString(16);
  const parts = [color.r, color.g, color.b, color.a];

  return `#${parts.map(hex)}`;
}

export interface Note {
  enTitle: string;
  icon: string | null;
  ruTitle: string;
}

export function parseNote(note: string): Note {
  const parts = note.split("|");
  if (parts.length === 3) {
    const [icon, ruTitle, enTitle] = parts;

    return { icon: icon.endsWith(".png") ? icon : null, ruTitle, enTitle };
  }

  return { icon: null, ruTitle: "", enTitle: "" };
}
