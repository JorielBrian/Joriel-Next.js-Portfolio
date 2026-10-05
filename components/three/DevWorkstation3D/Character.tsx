import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import { COLORS } from './constants';

export default function Character() {
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (leftArm.current) {
      leftArm.current.rotation.x =
        -0.35 + Math.sin(t * 6) * 0.08;
    }

    if (rightArm.current) {
      rightArm.current.rotation.x =
        -0.3 + Math.sin(t * 6 + 1) * 0.08;
    }

    if (head.current) {
      head.current.rotation.y =
        Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group position={[0.1, 0.35, -0.15]}>
      {/* Torso */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.65, 0.3]} />
        <meshStandardMaterial
          color={COLORS.hoodie}
          roughness={0.8}
        />
      </mesh>

      {/* Hood */}
      <mesh position={[0, 0.68, -0.02]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.28]} />
        <meshStandardMaterial
          color="#1e40af"
          roughness={0.8}
        />
      </mesh>

      {/* Head + hair + headset */}
      <group
        ref={head}
        position={[0, 0.85, 0]}
      >
        {/* Head */}
        <mesh castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#d9a978"
            roughness={0.8}
          />
        </mesh>

        {/* Hair */}
        <mesh
          position={[0.02, 0.1, -0.02]}
          castShadow
        >
          <sphereGeometry
            args={[
              0.21,
              16,
              16,
              0,
              Math.PI * 2,
              0,
              Math.PI * 0.55,
            ]}
          />
          <meshStandardMaterial
            color="#1c1917"
            roughness={0.9}
          />
        </mesh>

        {/* Headset band */}
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry
            args={[0.22, 0.015, 8, 24, Math.PI]}
          />
          <meshStandardMaterial color="#374151" />
        </mesh>

        {/* Left ear cup */}
        <mesh
          position={[-0.19, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.06, 0.06, 0.04, 16]}
          />
          <meshStandardMaterial color="#374151" />
        </mesh>

        {/* Right ear cup */}
        <mesh
          position={[0.19, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[0.06, 0.06, 0.04, 16]}
          />
          <meshStandardMaterial color="#374151" />
        </mesh>
      </group>

      {/* Left arm */}
      <mesh
        ref={leftArm}
        position={[-0.32, 0.5, 0.2]}
        rotation={[-0.35, 0, 0.15]}
        castShadow
      >
        <boxGeometry args={[0.15, 0.45, 0.15]} />
        <meshStandardMaterial
          color={COLORS.hoodie}
          roughness={0.8}
        />
      </mesh>

      {/* Right arm */}
      <mesh
        ref={rightArm}
        position={[0.32, 0.5, 0.2]}
        rotation={[-0.3, 0, -0.15]}
        castShadow
      >
        <boxGeometry args={[0.15, 0.45, 0.15]} />
        <meshStandardMaterial
          color={COLORS.hoodie}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}