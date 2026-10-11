import { Command } from "./types.ts";

const commands = new Map<string, Command>();
const commandFiles = Deno
  .readDirSync("src/commands/")
  .filter((file) => file.name.endsWith(".ts"));

for (const commandFile of commandFiles) {
  const module = await import(`./commands/${commandFile.name}`);

  if ("default" in module && module.default instanceof Command) {
    commands.set(module.default.name, module.default);
  }
}

if (import.meta.main) {
  const command = commands.get(Deno.args[0]);
  if (!command) {
    console.log("Command not found.");
    Deno.exit();
  }

  command.execute();
}
