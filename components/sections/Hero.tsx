/** @jsxImportSource react */
"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SolarSystem from "./SolarSystem";
import { useCameraController } from "../../hooks/useCameraController";
import HUD from "./HUD";
import * as THREE from "three";

function BackgroundGalaxy() {
  const starsRef = useRef<THREE.Points>(null);

  const count = 20000;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 400 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      col[i * 3 + 0] = 0.8 + Math.random() * 0.2;
      col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      col[i * 3 + 2] = 1.0;
    }
    return [pos, col];
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3] as [THREE.TypedArray, number]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3] as [THREE.TypedArray, number]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.6}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneContainer({ active }: { active: boolean }) {
  useCameraController(active);
  return (
    <>
      <SolarSystem />
      <BackgroundGalaxy />
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-[var(--bg)] overflow-hidden cursor-none"
    >
      <HUD active={isInView} />

      <div className="absolute inset-0 z-0 opacity-90">
        <Canvas
          camera={{ position: [0, 50, 120] as const, fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          shadows
        >
          <Suspense fallback={null}>
            <SceneContainer active={isInView} />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 text-center space-y-12 pointer-events-none">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display leading-[0.9] text-[var(--text)] tracking-tighter lowercase">
            i build software{" "}
            <span className="text-accent italic whitespace-nowrap">
              for the web.
            </span>
          </h1>
          <p className="text-base md:text-xl text-[var(--text-2)] font-body font-light tracking-tight lowercase">
            mostly backends. always javascript.
          </p>
        </div>
      </div>

      <div
        className="absolute inset-0 z-[-1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--text) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </section>
  );
}
