import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function RubiksCube() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y =
        state.clock.elapsedTime * 0.4;
    }
  });

  const faceColors = [
    '#dc2626',
    '#f97316',
    '#facc15',
    '#16a34a',
    '#2563eb',
    '#f5f5f5',
  ];

  const materials = useMemo(
    () =>
      faceColors.map(
        (color) =>
          new THREE.MeshStandardMaterial({
            color,
          })
      ),
    []
  );

  return (
    <mesh
      ref={ref}
      position={[0.55, 0.63, -0.35]}
      material={materials}
      castShadow
    >
      <boxGeometry args={[0.16, 0.16, 0.16]} />
    </mesh>
  );
}