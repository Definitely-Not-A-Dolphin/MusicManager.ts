import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from "@zip-js/zip-js";

/**
 * Unzips a zip file to a directory
 */
export async function unzipTo(
  file: string,
  destination: string,
): Promise<void> {
  const zipContent = Deno.readFileSync(file);
  const reader = new ZipReader(new Uint8ArrayReader(zipContent));
  const entries = await reader.getEntries();

  for (const entry of entries) {
    if (entry.directory) continue; // Assume the zip contains no directories
    const entryContent = await entry.getData(new Uint8ArrayWriter());
    Deno.createSync(destination + entry.filename).writeSync(entryContent);
  }
}

export function sortAlbums(entries: Deno.DirEntry[]): string[] {
  const filteredEntryNames: string[] = [];

  for (const entry of entries) {
    if (entry.isFile && entry.name.toLowerCase().endsWith(".zip")) {
      filteredEntryNames.push(entry.name);
    }
  }

  return filteredEntryNames.sort();
}

export const musicPath = "~/.local/share/musicmanager.ts.test/";
export const unpackedPath = musicPath + "unpacked/";
export const zipsPath = musicPath + "zips/";
export const singlesPath = unpackedPath + "singles/";
