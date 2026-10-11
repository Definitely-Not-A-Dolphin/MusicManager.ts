import { Command } from "../types.ts";
import * as Utils from "../utils.ts";

export default new Command({
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
});
