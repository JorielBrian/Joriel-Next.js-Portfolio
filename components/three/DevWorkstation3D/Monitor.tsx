import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import { COLORS } from './constants';

export default function Monitor() {
  const screen = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!screen.current) return;

    const material =
      screen.current.material as THREE.MeshStandardMaterial;

    material.emissiveIntensity =
      1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
  });

  return (
    <group position={[0.1, 0.85, -0.95]}>
      {/* Monitor frame */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.45, 0.04]} />
        <meshStandardMaterial
          color={COLORS.screen}
          roughness={0.6}
        />
      </mesh>

      {/* Screen */}
      <mesh
        ref={screen}
        position={[0, 0, 0.025]}
      >
        <planeGeometry args={[0.6, 0.36]} />
        <meshStandardMaterial
          color={COLORS.screen}
          emissive={COLORS.screen}
          emissiveIntensity={1.3}
        />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  );
}