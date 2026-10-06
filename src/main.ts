const musicPath = "/home/killioiden/Music/";
const singlesPath = "/home/killioiden/Music/Singles/";
const zipsPath = "/home/killioiden/Music/Zips/";
const charsToEscape = [" ", "&", "(", ")"];

const map = (str: string, exts: string[]) => exts.map((ext) => str + ext);
const songOrder = [
  ...map("Heaven Pierce Her - ULTRAKILL- ", [
    "INFINITE HYPERDEATH",
    "CHAOS-ORDER",
    "DEEP BLUE",
    "IMPERFECT HATRED",
    "PANDEMONIUM-WAR",
    "VIOLENCE",
    "FRAUD",
    "ENCORES I",
  ]),
  "Jorclai - The Metro (ULTRAKILL)",
  "Duv - And Death Held Its Name",
  ...map("KEYGEN CHURCH - ", [
    "Oscuro Domine",
    "Nel Nome Del Codice",
    "Tenebre Rosso Sangue",
    "█ ▓",
    "░ ▒ ▓ █",
    "░█░█░░█░█░█░",
  ]),
  ...map("6884 - ", [
    "Double Pendulum",
    "Quintic",
    "Soundtrack For A Fractal",
  ]),
  "Christopher Larkin - Hollow Knight- Gods & Nightmares",
  "Vincent Rubinetti - The Music of 3Blue1Brown",
].map((song) => song + ".zip");

function sortAlbums(entries: Deno.DirEntry[]) {
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

function clear() {
  const music = Array.from(Deno.readDirSync(musicPath));

  for (const entry of music) {
    if (
      entry.isDirectory && !(entry.name === "Singles" || entry.name === "Zips")
    ) Deno.removeSync(musicPath + entry.name, { recursive: true });
  }
}

async function append() {
  const tempDir = Deno.makeTempDirSync();

  console.log(`mv ${singlesPath}* ${tempDir}/`);
  await new Promise((r) => setTimeout(r, 1000));
  console.log(`mv ${tempDir}/* ${singlesPath}`);
  await new Promise((r) => setTimeout(r, 1000));

  Deno.removeSync(tempDir);
}

function unzipAlbums() {
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

      console.log(`unzip -d ${newDir} ${newPath}; rm ${newPath};`);
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
}
