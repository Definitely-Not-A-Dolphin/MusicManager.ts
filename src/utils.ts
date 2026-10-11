import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from "@zip-js/zip-js";

/**
 * Unzips a zip file to a directory
 */
export async function unzip(file: string, destination: string): Promise<void> {
  const zipContent = Deno.readFileSync(file);
  const reader = new ZipReader(new Uint8ArrayReader(zipContent));
  const entries = await reader.getEntries();

  for (const entry of entries) {
    if (entry.directory) continue; // Assume the zip contains no directories
    const entryContent = await entry.getData(new Uint8ArrayWriter());
    Deno.createSync(destination + entry.filename).writeSync(entryContent);
  }
}

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

export function sortAlbums(entries: Deno.DirEntry[]): string[] {
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
