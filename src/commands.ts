import { Command } from "./types.ts";
import * as Utils from "./utils.ts";

export const commands = new Map(Object.entries({
  add: new Command({
    name: "add",
    description: "add a zip file to manage",
    execute: function (): void {
      const paths = Deno.args.slice(1);

      for (const path of paths) {
        if (!path.toLowerCase().endsWith(".zip")) {
          console.log(`Skipping ${path} since it is not a zip file.`);
        }

        const file = path.split("/").at(-1)!;
        Deno.copyFileSync(path, Utils.zipsPath + file);
      }
    },
  }),
  append: new Command({
    name: "append",
    description: "remove singles from unpacked music and add them again",
    execute: function (): void {
      const tempDir = Deno.makeTempDirSync({ dir: Utils.musicPath });

      Deno.renameSync(Utils.singlesPath, tempDir + "/");
      Deno.renameSync(tempDir + "/", Utils.singlesPath);

      Deno.removeSync(tempDir);
    },
  }),
  clear: new Command({
    name: "clear",
    description: "remove all unpacked music",
    execute: function (): void {
      const music = Array.from(Deno.readDirSync(Utils.unpackedPath));

      for (const entry of music) {
        if (
          entry.isDirectory && entry.name !== "singles"
        ) Deno.removeSync(Utils.unpackedPath + entry.name, { recursive: true });
      }
    },
  }),
  unpack: new Command({
    name: "unpack",
    description: "Unpack all music",
    execute: async function (): Promise<void> {
      const entries = Utils.sortAlbums(
        Array.from(Deno.readDirSync(Utils.zipsPath)),
      );

      for (const entry of entries) {
        const zip = Utils.zipsPath + entry;
        const newDir = Utils.unpackedPath +
          zip.split("/").at(-1)!.slice(0, -4) +
          "/";

        try {
          Deno.mkdirSync(newDir);
          Utils.unzipTo(zip, newDir);
        } catch (e) {
          console.error(e);
          console.log("echo something went wrong :[");
        }

        await new Promise((t) => setTimeout(t, 0));
      }
    },
  }),
}));
