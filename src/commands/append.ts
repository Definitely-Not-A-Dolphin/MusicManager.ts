import { Command } from "../types.ts";
import * as Utils from "../utils.ts";

export default new Command({
  name: "append",
  description: "remove singles from unpacked music and add them again",
  execute: function (): void {
    const tempDir = Deno.makeTempDirSync({ dir: Utils.musicPath });

    Deno.renameSync(Utils.singlesPath, tempDir + "/");
    Deno.renameSync(tempDir + "/", Utils.singlesPath);

    Deno.removeSync(tempDir);
  },
});
