import { create } from "zustand";
import * as THREE from "three";

interface PlanetInfo {
  name: string;
  position: THREE.Vector3;
  radius: number;
}

interface SpaceState {
  focusedPlanet: PlanetInfo | null;
  isFlying: boolean;
  cameraMode: "free" | "orbit";
  hudMessage: string;
  setFocusedPlanet: (planet: PlanetInfo | null) => void;
  setFlying: (isFlying: boolean) => void;
  setCameraMode: (mode: "free" | "orbit") => void;
  setHudMessage: (msg: string) => void;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  focusedPlanet: null,
  isFlying: false,
  cameraMode: "free",
  hudMessage: "Click to Pilot • 1-8 Jump • 0 Overview",
  setFocusedPlanet: (planet) => set({ focusedPlanet: planet }),
  setFlying: (isFlying) => set({ isFlying }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setHudMessage: (msg) => set({ hudMessage: msg }),
}));
