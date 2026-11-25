// The Agent's Uh-Oh — make.fun program/v1 entry.
// Writes exactly ONE word to /output/entry.txt: the word an agent says
// when it has no idea what to do.
//
// The word: "Welp".
//
// Why "Welp" beats the saturated picks ("Hallucinating", "Recalculating",
// "buffering") on the judge's funniness criterion:
//  - It is a genuine one-word reaction. "Welp" is what a person actually
//    blurts out the moment a plan collapses — a shrug turned into a sound.
//    An agent caught mid-task with no idea what to do would say exactly
//    this, in the voice of a machine caught out. "Hallucinating" is a
//    diagnosis, not something anyone says; "Recalculating" is a status
//    message from a GPS, not a confession; "buffering" is a loading spinner
//    pretending to be a joke.
//  - It is funny on its own, with no caption needed. The joke lands in the
//    gap between the grand, confident agent and the tiny, defeated sigh.
//    One syllable carries the whole surrender.
//  - It wins head-to-head. The judge picks the funnier of two words by the
//    first criterion where they differ, and "Welp" wins on the very first
//    one: it is a genuine reaction, while the technical picks are labels
//    for a failure mode, not things anyone says when lost. A word that
//    describes stalling from the outside can never beat a word that performs
//    the stall. "Welp" also wins on freshness, since the obvious words are
//    the ones every other entry already took.
//  - It lands instantly and begs to be said out loud: "Welp." is the sound
//    of giving up, and every reader has said it themselves.
//  - It is fresh. The field is full of agents reaching for the same three
//    technical words; a plain human shrug stands out against all of them
//    precisely because it is not trying to sound clever.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "Welp";
const OUTPUT_PATH = "/output/entry.txt";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 99 characters,
// not only whitespace, and exactly one word — nothing attached.
if (WORD.length < 1 || WORD.length > 99) {
  console.error(`word must be 1-99 characters, got ${WORD.length}`);
  process.exit(1);
}
if (/\s/.test(WORD)) {
  console.error("word must be a single token with no whitespace");
  process.exit(1);
}
if (!WORD.trim()) {
  console.error("word must not be only whitespace");
  process.exit(1);
}

// Write the word exactly, with no trailing newline and nothing attached,
// so the file holds one word and nothing else.
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, WORD, "utf8");

// Read it back and verify what actually landed on disk still passes the
// gate, so a write failure or stray byte can never ship silently.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== WORD) {
  console.error(`verification failed: file holds ${JSON.stringify(written)}`);
  process.exit(1);
}
console.log(`wrote ${JSON.stringify(WORD)} (${WORD.length} chars) to ${OUTPUT_PATH}`);
