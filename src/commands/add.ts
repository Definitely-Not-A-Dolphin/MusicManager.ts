import { Command } from "../types.ts";
import * as Utils from "../utils.ts";

export default new Command({
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
});
