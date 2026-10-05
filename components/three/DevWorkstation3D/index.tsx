'use client';

import { Canvas } from '@react-three/fiber';

import Room from './Room';
import Desk from './Desk';
import Monitor from './Monitor';
import Character from './Character';
import Guitar from './Guitar';
import Chessboard from './Chessboard';
import RubiksCube from './RubiksCube';
import MouseParallaxCamera from './MouseParallaxCamera';

export default function DevWorkstation3D() {
  return (
    <div style={{ width: '100%', height: 480 }}>
      <Canvas
        shadows
        camera={{ position: [7, 5, 7], fov: 42 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.35} />

        <pointLight
          position={[0.1, 1, -0.7]}
          intensity={1.2}
          color="#38bdf8"
          distance={2.5}
        />

        <directionalLight
          position={[1.5, 2.5, 1.5]}
          intensity={0.5}
          castShadow
        />

        <Room />
        <Desk />
        <Monitor />
        <Character />
        <Guitar />
        <Chessboard />
        <RubiksCube />

        <MouseParallaxCamera />
      </Canvas>
    </div>
  );
}