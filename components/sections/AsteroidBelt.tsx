"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AsteroidBelt() {
  const count = 5000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = new THREE.Object3D();

  const asteroids = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const r = 35 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = (Math.random() - 0.5) * 2;
      const z = Math.sin(theta) * r;
      const rotationSpeed = (Math.random() - 0.5) * 0.01;
      const orbitSpeed = 0.001 + Math.random() * 0.002;
      
      data.push({ x, y, z, theta, r, rotationSpeed, orbitSpeed, scale: 0.02 + Math.random() * 0.08 });
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    asteroids.forEach((asteroid, i) => {
      asteroid.theta += delta * asteroid.orbitSpeed;
      const x = Math.cos(asteroid.theta) * asteroid.r;
      const z = Math.sin(asteroid.theta) * asteroid.r;
      
      tempObject.position.set(x, asteroid.y, z);
      tempObject.rotation.y += asteroid.rotationSpeed;
      tempObject.scale.setScalar(asteroid.scale);
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#888888" roughness={0.9} />
    </instancedMesh>
  );
}
