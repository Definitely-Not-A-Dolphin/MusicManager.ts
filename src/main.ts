import { unzip } from "./utils.ts";

const musicPath = Deno.cwd() + "/music/";
const unpackedPath = musicPath + "unpacked/";
const zipsPath = musicPath + "zips/";
const singlesPath = unpackedPath + "singles/";
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

  return [...sortedEntries, ...unsortedEntries];
}

function clear(): void {
  const music = Array.from(Deno.readDirSync(unpackedPath));

  for (const entry of music) {
    if (
      entry.isDirectory && entry.name !== "singles"
    ) Deno.removeSync(unpackedPath + entry.name, { recursive: true });
  }
}

function append(): void {
  const tempDir = Deno.makeTempDirSync({ dir: musicPath });

  Deno.renameSync(singlesPath, tempDir + "/");
  Deno.renameSync(tempDir + "/", singlesPath);
}

function unzipAlbums(): void {
  const entries = sortAlbums(Array.from(Deno.readDirSync(zipsPath)));

  for (const entry of entries) {
    const zip = zipsPath + entry;
    const newDir = unpackedPath + zip.split("/").at(-1)!.slice(0, -4) + "/";

    try {
      Deno.mkdirSync(newDir);
      unzip(zip, newDir);
    } catch (e) {
      console.error(e);
      console.log("echo something went wrong :[");
    }
  }
}

if (import.meta.main) {
  if (Deno.args[0] === "unzip") unzipAlbums();
  else if (Deno.args[0] === "append") append();
  else if (Deno.args[0] === "clear") clear();
}
