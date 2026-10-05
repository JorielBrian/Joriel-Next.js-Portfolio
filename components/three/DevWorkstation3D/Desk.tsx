import { COLORS } from './constants';

export default function Desk() {
    const legPositions: [number, number][] = [
        [-0.72, -0.65], [0.72, -0.65], [-0.72, 0.05], [0.72, 0.05],
    ];
    return (
        <group position={[0.1, 0, -0.6]}>
        <mesh position={[0, 0.55, 0]} receiveShadow>
            <boxGeometry args={[1.6, 0.05, 0.7]} />
            <meshStandardMaterial color={COLORS.desk} roughness={0.5} />
        </mesh>
        {legPositions.map(([x, z], i) => (
            <mesh key={i} position={[x, 0.25, z]} castShadow>
            <boxGeometry args={[0.05, 0.55, 0.05]} />
            <meshStandardMaterial color="#0b1220" />
            </mesh>
        ))}
        {/* keyboard hint */}
        <mesh position={[0.1, 0.585, -0.5]}>
            <boxGeometry args={[0.4, 0.01, 0.14]} />
            <meshStandardMaterial color="#111827" />
        </mesh>
        </group>
    );
}