import * as path from "../paths.ts";
import { Command } from "../types.ts";
import { sortAlbums, unzip } from "../utils.ts";

export default new Command({
  name: "unpack",
  description: "Unpack all music",
  execute: function (): void {
    const entries = sortAlbums(Array.from(Deno.readDirSync(path.zips)));

    for (const entry of entries) {
      const zip = path.zips + entry;
      const newDir = path.unpacked + zip.split("/").at(-1)!.slice(0, -4) + "/";

      try {
        Deno.mkdirSync(newDir);
        unzip(zip, newDir);
      } catch (e) {
        console.error(e);
        console.log("echo something went wrong :[");
      }
    }
  },
});
