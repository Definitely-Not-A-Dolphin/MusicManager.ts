const musicPath = Deno.cwd() + "/.local/share/musicmanager/";
const singlesPath = "/home/killioiden/Music/Singles/";
const zipsPath = musicPath + "zips/";
const charsToEscape = [" ", "&", "(", ")"];
const songOrder = [
  "Heaven Pierce Her - ULTRAKILL- INFINITE HYPERDEATH",
  "Heaven Pierce Her - ULTRAKILL- CHAOS-ORDER",
  "Heaven Pierce Her - ULTRAKILL- DEEP BLUE",
  "Heaven Pierce Her - ULTRAKILL- IMPERFECT HATRED",
  "Heaven Pierce Her - ULTRAKILL- PANDEMONIUM-WAR",
  "Heaven Pierce Her - ULTRAKILL- VIOLENCE",
  "Heaven Pierce Her - ULTRAKILL- FRAUD",
  "Heaven Pierce Her - ULTRAKILL- ENCORES I",
  "Jorclai - The Metro (ULTRAKILL)",
  "Duv - And Death Held Its Name",
  "KEYGEN CHURCH - Oscuro Domine",
  "KEYGEN CHURCH - Nel Nome Del Codice",
  "KEYGEN CHURCH - Tenebre Rosso Sangue",
  "KEYGEN CHURCH - █ ▓",
  "KEYGEN CHURCH - ░ ▒ ▓ █",
  "KEYGEN CHURCH - ░█░█░░█░█░█░",
  "6884 - Double Pendulum",
  "6884 - Quintic",
  "6884 - Soundtrack For A Fractal",
  "Christopher Larkin - Hollow Knight- Gods & Nightmares",
  "Vincent Rubinetti - The Music of 3Blue1Brown",
].map((song) => song + ".zip");

function sortAlbums(entries: Deno.DirEntry[]): string[] {
  entries = entries.filter((entry) =>
    entry.isFile && entry.name.endsWith(".zip")
  );
  const entryNames = entries.map((entry) => entry.name);
  const sortedEntries: string[] = [];
  const unsortedEntries: string[] = [];

  for (const album of songOrder) {
    if (entryNames.includes(album)) sortedEntries.push(album);
    else unsortedEntries.push(album);
  }

  sortedEntries.push(...unsortedEntries);

  return sortedEntries;
}

function test(): void {
  new Deno.Command("mv", { args: ["README.md", "README.md.md"] }).spawn();
}

function clear(): void {
  const music = Array.from(Deno.readDirSync(musicPath));

  for (const entry of music) {
    if (
      entry.isDirectory && !(entry.name === "Singles" || entry.name === "Zips")
    ) Deno.removeSync(musicPath + entry.name, { recursive: true });
  }
}

async function append(): Promise<void> {
  const tempDir = Deno.makeTempDirSync({ dir: musicPath });

  new Deno.Command("mv", { args: [singlesPath + "*", tempDir + "/"] }).spawn();
  //console.log(`mv ${singlesPath}* ${tempDir}/`);
  await new Promise((r) => setTimeout(r, 1000));
  new Deno.Command("mv", { args: [tempDir + "/*", singlesPath] }).spawn();
  console.log(`mv ${tempDir}/* ${singlesPath}`);
  await new Promise((r) => setTimeout(r, 1000));
}

function unzipAlbums(): void {
  const entries = sortAlbums(Array.from(Deno.readDirSync(zipsPath)));

  for (const entry of entries) {
    const zip = zipsPath + entry;
    let newDir = musicPath + zip.split("/").at(-1)!.slice(0, -4) + "/";
    let newPath = newDir + entry;

    try {
      Deno.mkdirSync(newDir);
      Deno.copyFileSync(zip, newPath);

      for (const charToEscape of charsToEscape) {
        newDir = newDir.replaceAll(charToEscape, "\\" + charToEscape);
        newPath = newPath.replaceAll(charToEscape, "\\" + charToEscape);
      }

      console.log(`unzip -d ${newDir} ${newPath};`);
      Deno.remove(newPath);
    } catch (e) {
      console.error(e);
      console.log("echo something went wrong :[");
    }
  }
}

if (import.meta.main) {
  if (Deno.args[0] === "unzip") unzipAlbums();
  else if (Deno.args[0] === "append") void append();
  else if (Deno.args[0] === "clear") clear();
  else if (Deno.args[0] === "test") test();
}
