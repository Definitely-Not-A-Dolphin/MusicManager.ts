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
