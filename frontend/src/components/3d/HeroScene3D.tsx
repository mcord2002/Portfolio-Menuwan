'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  Stars,
  Sparkles,
  TorusKnot,
  Octahedron,
  Ring,
} from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

function MouseParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.35,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.2,
      0.05,
    );
  });

  return <group ref={group}>{children}</group>;
}

function OrbitalRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const ring4 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.3) * 0.1;
      ring1.current.rotation.z = t * 0.25;
    }
    if (ring2.current) {
      ring2.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.4) * 0.15;
      ring2.current.rotation.y = t * -0.18;
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.12;
      ring3.current.rotation.z = Math.PI / 4 + Math.sin(t * 0.5) * 0.08;
    }
    if (ring4.current) {
      ring4.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.05;
      ring4.current.rotation.z = t * -0.1;
    }
  });

  return (
    <group>
      <Ring ref={ring1} args={[2.2, 2.24, 128]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.35} />
      </Ring>
      <Ring ref={ring2} args={[2.6, 2.62, 128]} rotation={[Math.PI / 3, 0.5, 0]}>
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
      </Ring>
      <Ring ref={ring3} args={[3, 3.02, 128]} rotation={[0.8, 0.3, 0]}>
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.12} />
      </Ring>
      <Ring ref={ring4} args={[3.4, 3.41, 128]} rotation={[1.2, 0.1, 0.2]}>
        <meshBasicMaterial color="#6366f1" transparent opacity={0.08} />
      </Ring>
    </group>
  );
}

function OrbitParticles() {
  const count = 24;
  const ref = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 2.2 + (i % 4) * 0.35,
      speed: 0.25 + (i % 5) * 0.06,
      y: (Math.random() - 0.5) * 1.2,
      size: 0.025 + (i % 3) * 0.012,
      color: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
    }));
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      const p = particles[i];
      const t = state.clock.elapsedTime * p.speed + p.angle;
      child.position.x = Math.cos(t) * p.radius;
      child.position.z = Math.sin(t) * p.radius;
      child.position.y = p.y + Math.sin(t * 2) * 0.15;
    });
  });

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function SideTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
      <TorusKnot
        ref={ref}
        args={[0.55, 0.18, 128, 16]}
        position={[2.1, 0.6, -1.5]}
        scale={0.85}
      >
        <MeshDistortMaterial
          color="#2563eb"
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={2.5}
        />
      </TorusKnot>
    </Float>
  );
}

function SideOctahedron() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * -0.25;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
      <Octahedron ref={ref} args={[0.5]} position={[-2, -0.5, -0.8]} scale={1.1}>
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          wireframe
        />
      </Octahedron>
    </Float>
  );
}

function FloatingCube() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={ref} position={[-1.8, 1.2, -1.2]} scale={0.35}>
        <boxGeometry />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function SceneContent({ lite }: { lite: boolean }) {
  return (
    <MouseParallax>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={1} color="#3b82f6" />
      <pointLight position={[4, -1, 3]} intensity={0.7} color="#8b5cf6" />
      <pointLight position={[0, 0, 2]} intensity={0.3} color="#6366f1" />

      <Stars
        radius={60}
        depth={30}
        count={lite ? 600 : 2000}
        factor={lite ? 2 : 2.5}
        fade
        speed={0.4}
      />
      <Sparkles
        count={lite ? 30 : 80}
        scale={[7, 5, 7]}
        size={1.5}
        speed={0.4}
        color="#93c5fd"
      />

      <OrbitalRings />
      {!lite && (
        <>
          <OrbitParticles />
          <SideTorus />
          <SideOctahedron />
          <FloatingCube />
        </>
      )}
    </MouseParallax>
  );
}

export function HeroScene3D() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
    );
  }

  return (
    <div className="h-full w-full min-h-[inherit]">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent lite={isMobile} />
      </Canvas>
    </div>
  );
}
