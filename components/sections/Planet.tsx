"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface MoonProps {
  textureUrl: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
}

function Moon({ textureUrl, radius, orbitRadius, orbitSpeed }: MoonProps) {
  const ref = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const map = useTexture(textureUrl);

  useFrame((state, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * orbitSpeed;
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={ref} position={[orbitRadius, 0, 0]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial map={map} />
      </mesh>
    </group>
  );
}

interface PlanetProps {
  name: string;
  textureUrl: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  tilt?: number;
  hasRings?: boolean;
  moons?: MoonProps[];
}

export default function Planet({ 
  name,
  textureUrl, 
  radius, 
  orbitRadius, 
  orbitSpeed, 
  rotationSpeed, 
  tilt = 0,
  hasRings = false,
  moons = []
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  const map = useTexture(textureUrl);

  useFrame((state, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * orbitSpeed;
    if (meshRef.current) meshRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group ref={orbitRef}>
      <group position={[orbitRadius, 0, 0]} rotation={[tilt, 0, 0]}>
        <mesh 
          ref={meshRef} 
          name={name}
          castShadow 
          receiveShadow
          userData={{ isPlanet: true, name, radius }}
        >
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial map={map} roughness={0.8} metalness={0.2} />
        </mesh>

        {hasRings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.4, radius * 2.8, 64]} />
            <meshStandardMaterial 
              color="#a49b81" 
              transparent 
              opacity={0.4} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        )}

        {moons.map((moon, i) => (
          <Moon key={i} {...moon} />
        ))}
      </group>
      
      {/* Orbital Path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.1, orbitRadius + 0.1, 256]} />
        <meshBasicMaterial color="white" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
