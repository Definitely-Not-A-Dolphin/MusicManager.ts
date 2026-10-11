import { Command } from "../types.ts";
import * as Utils from "../utils.ts";

export default new Command({
  name: "unpack",
  description: "Unpack all music",
  execute: async function (): Promise<void> {
    const entries = Utils.sortAlbums(Array.from(Deno.readDirSync(Utils.zipsPath)));

    for (const entry of entries) {
      const zip = Utils.zipsPath + entry;
      const newDir = Utils.unpackedPath + zip.split("/").at(-1)!.slice(0, -4) + "/";

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
});
