"use client";

import { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Planet from "./Planet";
import Earth from "./Earth";
import AsteroidBelt from "./AsteroidBelt";

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.1;
  });
  
  return (
    <mesh ref={meshRef} userData={{ isPlanet: true, name: "Sun", radius: 5 }}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial 
        emissive="#ffcc00" 
        emissiveIntensity={2} 
        color="#ff8800"
      />
      <pointLight intensity={1500} distance={1000} decay={2} color="#fff2cc" castShadow />
    </mesh>
  );
}

export default function SolarSystem() {
  return (
    <group>
      <Sun />
      
      {/* 1. Mercury */}
      <Suspense fallback={null}>
        <Planet 
          name="Mercury"
          textureUrl="https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/mercurymap.jpg"
          radius={0.4}
          orbitRadius={12}
          orbitSpeed={0.04}
          rotationSpeed={0.01}
        />
      </Suspense>

      {/* 2. Venus */}
      <Suspense fallback={null}>
        <Planet 
          name="Venus"
          textureUrl="https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/venusmap.jpg"
          radius={0.9}
          orbitRadius={18}
          orbitSpeed={0.015}
          rotationSpeed={0.005}
          tilt={Math.PI}
        />
      </Suspense>

      {/* 3. Earth */}
      <OrbitalWrapper orbitRadius={25} orbitSpeed={0.01}>
        <Earth />
      </OrbitalWrapper>

      {/* 4. Mars */}
      <Suspense fallback={null}>
        <Planet 
          name="Mars"
          textureUrl="https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/marsmap1k.jpg"
          radius={0.5}
          orbitRadius={32}
          orbitSpeed={0.008}
          rotationSpeed={0.05}
        />
      </Suspense>

      <AsteroidBelt />

      {/* 5. Jupiter */}
      <Suspense fallback={null}>
        <Planet 
          name="Jupiter"
          textureUrl="https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/jupitermap.jpg"
          radius={2.5}
          orbitRadius={50}
          orbitSpeed={0.004}
          rotationSpeed={0.02}
          moons={[
            { name: "Io", textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg", radius: 0.1, orbitRadius: 4, orbitSpeed: 0.2 },
            { name: "Europa", textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg", radius: 0.08, orbitRadius: 5.5, orbitSpeed: 0.15 },
            { name: "Ganymede", textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg", radius: 0.12, orbitRadius: 7, orbitSpeed: 0.1 },
            { name: "Callisto", textureUrl: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg", radius: 0.11, orbitRadius: 8.5, orbitSpeed: 0.08 },
          ] as any}
        />
      </Suspense>

      {/* 6. Saturn */}
      <Suspense fallback={null}>
        <Planet 
          name="Saturn"
          textureUrl="https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/saturnmap.jpg"
          radius={2.1}
          orbitRadius={68}
          orbitSpeed={0.002}
          rotationSpeed={0.02}
          hasRings
        />
      </Suspense>

      {/* 7. Uranus */}
      <Suspense fallback={null}>
        <Planet 
          name="Uranus"
          textureUrl="https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/uranusmap.jpg"
          radius={1.2}
          orbitRadius={85}
          orbitSpeed={0.001}
          rotationSpeed={0.01}
          tilt={Math.PI / 2}
        />
      </Suspense>

      {/* 8. Neptune */}
      <Suspense fallback={null}>
        <Planet 
          name="Neptune"
          textureUrl="https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/neptunemap.jpg"
          radius={1.1}
          orbitRadius={100}
          orbitSpeed={0.0008}
          rotationSpeed={0.01}
        />
      </Suspense>
    </group>
  );
}

function OrbitalWrapper({ children, orbitRadius, orbitSpeed }: { children: React.ReactNode, orbitRadius: number, orbitSpeed: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * orbitSpeed;
  });
  return (
    <group ref={ref}>
      <group position={[orbitRadius, 0, 0]}>
        {children}
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.1, orbitRadius + 0.1, 256]} />
        <meshBasicMaterial color="white" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
