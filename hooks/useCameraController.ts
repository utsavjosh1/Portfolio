"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSpaceStore } from "./useSpaceStore";
import gsap from "gsap";

export function useCameraController(isActive: boolean = true) {
  const { camera, gl, scene, raycaster } = useThree();
  const { 
    focusedPlanet, 
    setFocusedPlanet, 
    setFlying, 
    setCameraMode,
    setHudMessage
  } = useSpaceStore();

  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const targetOrbitDist = useRef(5);
  
  // Rotation refs
  const pitch = useRef(0);
  const yaw = useRef(0);
  const orbitalYaw = useRef(0);
  const orbitalPitch = useRef(0);

  const flyTo = (planet: any) => {
    const planetWorldPos = new THREE.Vector3().setFromMatrixPosition(planet.matrixWorld);
    const radius = planet.userData.radius;
    const dist = radius * 4;

    setFocusedPlanet({
      name: planet.userData.name,
      position: planetWorldPos,
      radius: radius
    });
    setFlying(true);
    setCameraMode("orbit");
    targetOrbitDist.current = dist;
    setHudMessage(`Approaching ${planet.userData.name}...`);

    // GSAP Fly-to Animation
    const currentDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion);
    const targetCamPos = planetWorldPos.clone().add(currentDirection.multiplyScalar(dist));

    gsap.to(camera.position, {
      x: targetCamPos.x,
      y: targetCamPos.y,
      z: targetCamPos.z,
      duration: 2.5,
      ease: "power2.inOut",
      onComplete: () => {
        setFlying(false);
        setHudMessage(`In Orbit: ${planet.userData.name}`);
      }
    });
  };

  const returnOverview = () => {
    setFocusedPlanet(null);
    setFlying(true);
    setCameraMode("free");
    setHudMessage("System Overview");

    gsap.to(camera.position, {
      x: 0, y: 50, z: 120,
      duration: 3,
      ease: "power2.inOut",
      onComplete: () => setFlying(false)
    });
    
    gsap.to(pitch, { current: -0.4, duration: 3 });
    gsap.to(yaw, { current: 0, duration: 3 });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement === gl.domElement) {
        if (e.buttons === 2) { // Right click drag for orbit
          orbitalYaw.current -= e.movementX * 0.005;
          orbitalPitch.current -= e.movementY * 0.005;
          orbitalPitch.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, orbitalPitch.current));
        } else {
          yaw.current -= e.movementX * 0.002;
          pitch.current -= e.movementY * 0.002;
          pitch.current = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, pitch.current));
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
      if (e.key === "0") returnOverview();
      if (e.key >= "1" && e.key <= "8") {
        const name = planets[parseInt(e.key) - 1];
        const obj = scene.getObjectByName(name);
        if (obj) flyTo(obj);
      }
      if (e.key.toLowerCase() === "w" || e.key.toLowerCase() === "e") {
        const obj = scene.getObjectByName("Earth");
        if (obj) flyTo(obj);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (focusedPlanet) {
        targetOrbitDist.current = Math.max(
          focusedPlanet.radius * 1.2,
          Math.min(200, targetOrbitDist.current + e.deltaY * 0.05)
        );
      }
    };

    const handleClick = () => {
      if (!isPointerLocked) {
        gl.domElement.requestPointerLock();
      } else {
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        const planetHit = intersects.find(obj => obj.object.userData?.isPlanet);
        if (planetHit) flyTo(planetHit.object);
      }
    };

    if (!isActive) {
      if (document.pointerLockElement === gl.domElement) {
        document.exitPointerLock();
      }
      return;
    }

    const handlePointerLockChange = () => setIsPointerLocked(document.pointerLockElement === gl.domElement);

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [gl, camera, scene, raycaster, isPointerLocked, focusedPlanet, isActive]);

  useFrame((state, delta) => {
    if (!isActive) return;
    // 1. Update Rotation (First Person Look)
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(pitch.current, yaw.current, 0, "YXZ")
    );
    camera.quaternion.slerp(targetQuaternion, 0.1);

    // 2. Orbit Logic
    if (focusedPlanet && !gsap.isTweening(camera.position)) {
      const planetMesh = scene.getObjectByName(focusedPlanet.name);
      if (planetMesh) {
        const worldPos = new THREE.Vector3().setFromMatrixPosition(planetMesh.matrixWorld);
        
        // Calculate orbit position based on right-click drag (orbitalYaw/Pitch)
        const orbitOffset = new THREE.Vector3(0, 0, targetOrbitDist.current)
          .applyEuler(new THREE.Euler(orbitalPitch.current, orbitalYaw.current, 0, "YXZ"))
          .applyQuaternion(camera.quaternion); // Relative to camera look

        camera.position.lerp(worldPos.clone().add(orbitOffset), 0.1);
      }
    }
  });

  return null;
}
