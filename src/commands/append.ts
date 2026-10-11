import * as path from "../paths.ts";
import { Command } from "../types.ts";

export default new Command({
  name: "append",
  description: "remove singles from unpacked music and add them again",
  execute: function (): void {
    const tempDir = Deno.makeTempDirSync({ dir: path.music });

    Deno.renameSync(path.singles, tempDir + "/");
    Deno.renameSync(tempDir + "/", path.singles);

    Deno.removeSync(tempDir);
  },
});
