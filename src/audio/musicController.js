// ─────────────────────────────────────────────────────────────
// One shared background-music controller for the whole site.
//
// • Exactly one <audio> element exists, created once at module load.
//   It is never re-created by React renders or route changes, so the
//   song keeps its position while the visitor navigates.
// • Nothing here ever plays automatically. The only way to START the
//   music is start(), which the central "click here" yin-yang calls.
// • toggle() (the equalizer bars) only pauses/resumes AFTER the music
//   has been started. Before that it does nothing.
// • State is derived from the real audio element's events, so the UI
//   can never claim the song is playing when it isn't.
//
// To change the song: replace the file below (or change the import).
// ─────────────────────────────────────────────────────────────

import songUrl from "../assets/audio/u-said-it-v13-1167.mp3";

const AUDIO_ID = "site-music";

let audio = null;
let started = false; // has "click here" successfully started playback?
let error = false; // did loading or playback fail?
let snapshot = { started: false, playing: false, error: false };
const listeners = new Set();

function computeSnapshot() {
  const playing = Boolean(audio && started && !audio.paused && !audio.ended);
  if (snapshot.started !== started || snapshot.playing !== playing || snapshot.error !== error) {
    snapshot = { started, playing, error };
  }
  return snapshot;
}

function emit() {
  computeSnapshot();
  listeners.forEach((l) => l());
}

function getAudio() {
  if (typeof document === "undefined") return null;
  if (audio) return audio;

  // Reuse an existing element if the module is ever evaluated twice
  // (e.g. during hot reloads in development).
  audio = document.getElementById(AUDIO_ID);
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = AUDIO_ID;
    audio.src = songUrl;
    audio.loop = true;
    audio.preload = "none"; // don't even download until it's needed
    audio.setAttribute("aria-hidden", "true");
    audio.style.display = "none";
    document.body.appendChild(audio);
  }

  ["play", "playing", "pause", "ended"].forEach((ev) => audio.addEventListener(ev, emit));
  audio.addEventListener("error", () => {
    // File missing or undecodable: drop back to "not started" so the
    // visitor can retry from "click here".
    error = true;
    started = false;
    emit();
  });
  return audio;
}

/** Called by the central "click here" control. Starts the song if it
 *  hasn't been started yet (or if a previous attempt failed). Never
 *  restarts or rewinds a song that is already started. */
export function startMusic() {
  const el = getAudio();
  if (!el || started) return Promise.resolve(false);

  error = false;
  if (el.error) el.load(); // retry after a load failure
  return el
    .play()
    .then(() => {
      started = true;
      emit();
      return true;
    })
    .catch(() => {
      // Autoplay policy / decode failure: stay silent, allow retry.
      error = true;
      started = false;
      emit();
      return false;
    });
}

/** Called by the equalizer bars. Pause ↔ resume from the same
 *  position. Does nothing until startMusic() has succeeded. */
export function toggleMusic() {
  const el = getAudio();
  if (!el || !started) return;
  if (el.paused) {
    el.play().catch(() => {
      error = true;
      emit();
    });
  } else {
    el.pause(); // currentTime is preserved by the element
  }
}

export function subscribe(listener) {
  getAudio();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return computeSnapshot();
}

const serverSnapshot = { started: false, playing: false, error: false };
export function getServerSnapshot() {
  return serverSnapshot;
}
