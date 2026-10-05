import { COLORS } from './constants';

export default function Room() {
  return (
    <group>
      {/* Back wall */}
      <mesh
        position={[0, 1.2, -1.4]}
        receiveShadow
      >
        <boxGeometry args={[3.4, 2.4, 0.05]} />
        <meshStandardMaterial
          color={COLORS.wall}
          roughness={0.9}
        />
      </mesh>

      {/* Side wall */}
      <mesh
        position={[-1.7, 1.2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <boxGeometry args={[2.8, 2.4, 0.05]} />
        <meshStandardMaterial
          color={COLORS.wall}
          roughness={0.9}
        />
      </mesh>

      {/* Floor */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[3.4, 2.8]} />
        <meshStandardMaterial
          color={COLORS.floor}
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}