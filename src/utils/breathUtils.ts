import {Settings} from "./types";

export function timeToSeconds(time: string): number {
  const [minutes, seconds] = time.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

export function calculateCycles(settings: Settings): number {
  const {inhaleTime, holdInhaleTime, exhaleTime, holdExhaleTime} = settings;
  const seconds = timeToSeconds(settings.time);
  const cycle = inhaleTime + holdInhaleTime + exhaleTime + holdExhaleTime;

  return Math.trunc(seconds / cycle);
}
