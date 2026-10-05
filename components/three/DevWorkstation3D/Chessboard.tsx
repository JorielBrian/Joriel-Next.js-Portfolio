import { useMemo } from 'react';

export default function Chessboard() {
  const tiles = useMemo(() => {
    const size = 0.04;

    const arr: {
      x: number;
      z: number;
      dark: boolean;
    }[] = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        arr.push({
          x: (i - 3.5) * size,
          z: (j - 3.5) * size,
          dark: (i + j) % 2 === 0,
        });
      }
    }

    return arr;
  }, []);

  return (
    <group position={[-0.55, 0.585, -0.5]}>
      {tiles.map((tile, index) => (
        <mesh
          key={index}
          position={[tile.x, 0, tile.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.04, 0.04]} />

          <meshStandardMaterial
            color={
              tile.dark
                ? '#1f2937'
                : '#e5e7eb'
            }
          />
        </mesh>
      ))}
    </group>
  );
}