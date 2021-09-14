import type { RGBA } from "@jimp/core/types/etc";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";

export async function sureDirectoryExist(filePath: string) {
  const dir = path.dirname(filePath);
  // console.log("sureDirectoryExist", dir);
  await fs.promises.mkdir(dir, { recursive: true });
}

export async function downloadFile(url: string, savePath: string) {
  await sureDirectoryExist(savePath);

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
  await sureDirectoryExist(savePath);

  fs.writeFileSync(savePath, content, { encoding: "utf-8" });
}

export async function writeJson(file: string, data: any) {
  await writeFile(file, JSON.stringify(data, null, 2));
}

export async function copyFile(from: string, to: string) {
  await sureDirectoryExist(to);

  fs.copyFileSync(from, to);
}

export function rgbaToHex(color: RGBA): string {
  const hex = (c: number) => c.toString(16);
  const parts = [color.r, color.g, color.b, color.a];

  return `#${parts.map(hex).join("")}`;
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

export function logAsyncMethod(humanName: string) {
  return function <F extends Function>(
    _target: any,
    name: string,
    descriptor: TypedPropertyDescriptor<F>
  ): TypedPropertyDescriptor<F> {
    const { enumerable, configurable, value } = descriptor;

    return {
      configurable,
      enumerable,

      get() {
        const that = this;

        async function wrapped(...args: any[]) {
          console.log();
          console.log(humanName);
          try {
            await value!.call(that, ...args);
          } catch (e) {
            throw new Error(`Error on ${name}(${args.join(", ")}): 
${e.message}
${e.stack}`);
          }
        }

        return wrapped as any;
      },

      // tslint:disable-next-line:no-shadowed-variable
      set(value: F) {
        Object.defineProperty(this, name, {
          configurable: true,
          enumerable: true,
          value,
          writable: true,
        });
      },
    };
  };
}
