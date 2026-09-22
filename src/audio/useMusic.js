import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, startMusic, subscribe, toggleMusic } from "./musicController";

/** Current music state ({ started, playing, error }) plus actions. */
export function useMusic() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { ...state, start: startMusic, toggle: toggleMusic };
}
