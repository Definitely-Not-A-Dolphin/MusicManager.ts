import * as path from "../paths.ts";
import { Command } from "../types.ts";

export default new Command({
  name: "clear",
  description: "remove all unpacked music",
  execute: function (): void {
    const music = Array.from(Deno.readDirSync(path.unpacked));

    for (const entry of music) {
      if (
        entry.isDirectory && entry.name !== "singles"
      ) Deno.removeSync(path.unpacked + entry.name, { recursive: true });
    }
  },
});
