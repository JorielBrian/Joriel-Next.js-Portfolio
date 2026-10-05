export default function Guitar() {
  return (
    <group
      position={[-1.35, 0.35, -0.4]}
      rotation={[0, 0.3, 0.12]}
    >
      {/* Lower body */}
      <mesh
        scale={[1, 1, 0.35]}
        position={[0, -0.15, 0]}
        castShadow
      >
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color="#c2703d"
          roughness={0.6}
        />
      </mesh>

      {/* Upper body */}
      <mesh
        scale={[1, 1, 0.35]}
        position={[0, 0.18, 0]}
        castShadow
      >
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color="#c2703d"
          roughness={0.6}
        />
      </mesh>

      {/* Neck */}
      <mesh
        position={[0, 0.65, 0]}
        castShadow
      >
        <boxGeometry args={[0.05, 0.7, 0.03]} />
        <meshStandardMaterial
          color="#3f2a1a"
          roughness={0.7}
        />
      </mesh>

      {/* Headstock */}
      <mesh
        position={[0, 1.02, 0]}
        castShadow
      >
        <boxGeometry args={[0.1, 0.1, 0.03]} />
        <meshStandardMaterial
          color="#3f2a1a"
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}