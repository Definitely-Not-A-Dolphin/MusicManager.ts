import { commands } from "./commands.ts";

if (import.meta.main) {
  const command = commands.get(Deno.args[0]);
  if (!command) {
    console.log("Command not found.");
    Deno.exit();
  }

  command.execute();
}
