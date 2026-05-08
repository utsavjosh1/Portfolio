"use client";

import { useRef, useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

const EARTH_RADIUS = 1; // Scaled to 1 as per new spec

const Earth = forwardRef((props, ref) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const markerRef = useRef<THREE.Mesh>(null);
  const atmosRef = useRef<THREE.Mesh>(null);

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [localDist, setLocalDist] = useState(100);
  const [localProximity, setLocalProximity] = useState(0);
  
  // Expose marker position to parent for camera tracking
  const markerPos = useMemo(() => {
    if (!coords) return new THREE.Vector3(0, 0, 0);
    const { lat, lon } = coords;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const radius = EARTH_RADIUS + 0.02; // Slightly above surface
    
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }, [coords]);

  useImperativeHandle(ref, () => ({
    markerPos: markerPos
  }));

  // Load NASA textures
  const [map, cloudMap, normalMap, specularMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
  ]);

  // Geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => setCoords({ lat: 40.7128, lon: -74.006 }) // Fallback NY
      );
    } else {
      setCoords({ lat: 40.7128, lon: -74.006 });
    }
  }, []);

  useFrame((state, delta) => {
    const worldPos = new THREE.Vector3();
    if (earthRef.current) earthRef.current.getWorldPosition(worldPos);
    const d = state.camera.position.distanceTo(worldPos);
    const p = Math.max(0, Math.min(1, (10 - d) / 8));

    // Update state occasionally to avoid excessive re-renders but keep label responsive
    if (Math.abs(localDist - d) > 0.1) {
      setLocalDist(d);
      setLocalProximity(p);
    }

    // Slow down and stop rotation as we get close
    const effectiveRotationSpeed = delta * 0.05 * (1 - p);
    if (earthRef.current) earthRef.current.rotation.y += effectiveRotationSpeed;
    if (cloudRef.current) cloudRef.current.rotation.y += effectiveRotationSpeed * 1.2;
    
    // Update atmosphere opacity directly
    if (atmosRef.current) {
      (atmosRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 * (1 - p * 0.5);
    }

    // Pulsing marker
    if (markerRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
      markerRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <mesh 
        ref={earthRef} 
        name="Earth"
        castShadow 
        receiveShadow
        userData={{ isPlanet: true, name: "Earth", radius: EARTH_RADIUS }}
      >
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshStandardMaterial
          map={map}
          normalMap={normalMap}
          roughnessMap={specularMap} 
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      <mesh ref={cloudRef}>
        <sphereGeometry args={[EARTH_RADIUS * 1.01, 64, 64]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={atmosRef}>
        <sphereGeometry args={[EARTH_RADIUS * 1.03, 64, 64]} />
        <meshBasicMaterial
          color="#4a9eff"
          transparent
          opacity={0.15} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {coords && (
        <group position={markerPos}>
          <mesh ref={markerRef}>
            <sphereGeometry args={[0.008, 16, 16]} />
            <meshBasicMaterial color="#c8ff00" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.012, 0.018, 32]} />
            <meshBasicMaterial color="#c8ff00" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          
          {localDist < 1.5 && (
            <Html distanceFactor={2} position={[0, 0.05, 0]} center>
              <div className="bg-black/90 border border-accent/30 px-2 py-0.5 rounded-sm text-[6px] text-accent font-mono backdrop-blur-md uppercase tracking-tighter shadow-[0_0_10px_rgba(200,255,0,0.2)]">
                Precision Origin: Delhi, India
              </div>
            </Html>
          )}
        </group>
      )}
    </group>
  );
});

Earth.displayName = "Earth";
export default Earth;
