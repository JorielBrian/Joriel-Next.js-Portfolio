'use client';
// Every comment here explains a Three.js/R3F concept in one line —
// look these up as you go, don't try to memorize them all at once.

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Colors pulled straight from your Tailwind theme (blue-950/900/800) so the
// scene actually matches your site instead of looking pasted on top of it.
const WALL = "#172554";
const FLOOR = "#1e3a8a";
const DESK = "#0f172a";
const HOODIE = "#1d4ed8";
const SCREEN = "#38bdf8";

function Room() {
  return (
    <group>
      {/* back wall — a flat box, not a special "wall" object. In Three.js
          a wall is just a very thin box, same as everything else. */}
      <mesh position={[0, 1.2, -1.4]} receiveShadow>
        <boxGeometry args={[3.4, 2.4, 0.05]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>
      {/* side wall */}
      <mesh position={[-1.7, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[2.8, 2.4, 0.05]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>
      {/* floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.4, 2.8]} />
        <meshStandardMaterial color={FLOOR} roughness={0.95} />
      </mesh>
    </group>
  );
}

function Monitor() {
  const screen = useRef<THREE.Mesh>(null);

  // useFrame runs once per rendered frame — like requestAnimationFrame,
  // but R3F wires it up for you. This is THE way to animate in Three.js:
  // mutate a property directly each frame, no CSS transitions involved.
  useFrame((state) => {
    if (!screen.current) return;
    const material = screen.current.material as THREE.MeshStandardMaterial;
    // "emissive" = a material that gives off its own light, like a real
    // screen. Oscillating it makes it feel alive, like code scrolling by.
    material.emissiveIntensity = 1.3 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
  });

  return (
    <group position={[0.1, 0.85, -0.95]}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.45, 0.04]} />
        <meshStandardMaterial color="#111827" roughness={0.6} />
      </mesh>
      <mesh ref={screen} position={[0, 0, 0.025]}>
        <planeGeometry args={[0.6, 0.36]} />
        <meshStandardMaterial color={SCREEN} emissive={SCREEN} emissiveIntensity={1.3} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  );
}

function Desk() {
  const legPositions: [number, number][] = [
    [-0.72, -0.65], [0.72, -0.65], [-0.72, 0.05], [0.72, 0.05],
  ];
  return (
    <group position={[0.1, 0, -0.6]}>
      <mesh position={[0, 0.55, 0]} receiveShadow>
        <boxGeometry args={[1.6, 0.05, 0.7]} />
        <meshStandardMaterial color={DESK} roughness={0.5} />
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

// A simplified, low-poly person — no external 3D model file needed, just
// basic shapes (box, sphere) grouped together. This is genuinely how a
// lot of people start with Three.js: primitives first, real models later.
function Character() {
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leftArm.current) leftArm.current.rotation.x = -0.35 + Math.sin(t * 6) * 0.08;
    if (rightArm.current) rightArm.current.rotation.x = -0.3 + Math.sin(t * 6 + 1) * 0.08;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <group position={[0.1, 0.35, -0.15]}>
      {/* torso, in a navy hoodie */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.65, 0.3]} />
        <meshStandardMaterial color={HOODIE} roughness={0.8} />
      </mesh>
      {/* hood, sitting at the neckline */}
      <mesh position={[0, 0.68, -0.02]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.28]} />
        <meshStandardMaterial color="#1e40af" roughness={0.8} />
      </mesh>

      {/* head + hair + headset live in one group so they rotate together */}
      <group ref={head} position={[0, 0.85, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#d9a978" roughness={0.8} />
        </mesh>
        {/* hair, swept to one side */}
        <mesh position={[0.02, 0.1, -0.02]} castShadow>
          <sphereGeometry args={[0.21, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color="#1c1917" roughness={0.9} />
        </mesh>
        {/* headset band — a torus (donut) sliced to a half-arc with its last
            argument. Its default plane already arcs from ear to ear over
            the top, so no extra rotation needed here. */}
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[0.22, 0.015, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        {/* ear cups — cylinder axis defaults to Y, rotate on Z so it points sideways instead */}
        <mesh position={[-0.19, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <mesh position={[0.19, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
      </group>

      {/* arms, angled forward toward the keyboard */}
      <mesh ref={leftArm} position={[-0.32, 0.5, 0.2]} rotation={[-0.35, 0, 0.15]} castShadow>
        <boxGeometry args={[0.15, 0.45, 0.15]} />
        <meshStandardMaterial color={HOODIE} roughness={0.8} />
      </mesh>
      <mesh ref={rightArm} position={[0.32, 0.5, 0.2]} rotation={[-0.3, 0, -0.15]} castShadow>
        <boxGeometry args={[0.15, 0.45, 0.15]} />
        <meshStandardMaterial color={HOODIE} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Guitar() {
  return (
    <group position={[-1.35, 0.35, -0.4]} rotation={[0, 0.3, 0.12]}>
      {/* body: two stacked spheres, flattened on one axis, makes a figure-8 */}
      <mesh scale={[1, 1, 0.35]} position={[0, -0.15, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#c2703d" roughness={0.6} />
      </mesh>
      <mesh scale={[1, 1, 0.35]} position={[0, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#c2703d" roughness={0.6} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[0.05, 0.7, 0.03]} />
        <meshStandardMaterial color="#3f2a1a" roughness={0.7} />
      </mesh>
      {/* headstock */}
      <mesh position={[0, 1.02, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.03]} />
        <meshStandardMaterial color="#3f2a1a" roughness={0.7} />
      </mesh>
    </group>
  );
}

function RubiksCube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.4;
  });
  // A box mesh accepts one material PER FACE if you pass an array instead
  // of a single material — six colors, six faces, no extra geometry needed.
  const faceColors = ["#dc2626", "#f97316", "#facc15", "#16a34a", "#2563eb", "#f5f5f5"];
  const materials = useMemo(
    () => faceColors.map((c) => new THREE.MeshStandardMaterial({ color: c })),
    []
  );
  return (
    <mesh ref={ref} position={[0.55, 0.63, -0.35]} material={materials} castShadow>
      <boxGeometry args={[0.16, 0.16, 0.16]} />
    </mesh>
  );
}

function Chessboard() {
  // An 8x8 grid built from a double loop instead of 64 hand-placed tiles.
  const tiles = useMemo(() => {
    const size = 0.04;
    const arr: { x: number; z: number; dark: boolean }[] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        arr.push({ x: (i - 3.5) * size, z: (j - 3.5) * size, dark: (i + j) % 2 === 0 });
      }
    }
    return arr;
  }, []);

  return (
    <group position={[-0.55, 0.585, -0.5]}>
      {tiles.map((t, i) => (
        <mesh key={i} position={[t.x, 0, t.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.04, 0.04]} />
          <meshStandardMaterial color={t.dark ? "#1f2937" : "#e5e7eb"} />
        </mesh>
      ))}
    </group>
  );
}

// Camera gently follows the mouse instead of a fixed orbit — a subtle
// parallax effect rather than something the visitor has to drag.
function MouseParallaxCamera() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0.1, 1, -0.5));

  useFrame(() => {
    // pointer.x/y are already normalized to -1..1 by R3F — no manual
    // mouse-position math needed.
    const targetX = 1.6 + pointer.x * 0.4;
    const targetY = 1.5 - pointer.y * 0.2;
    // lerp = smoothly move a fraction of the way there each frame,
    // instead of snapping straight to the mouse position.
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(target.current);
  });
  return null;
}

export default function DevWorkstation3D() {
  return (
    <div style={{ width: "100%", height: 480 }}>
      <Canvas
        shadows
        camera={{ position: [1.8, 1.5, 1.8], fov: 42 }}
        gl={{ alpha: true }} // transparent canvas bg so your page's own dark background shows through
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[0.1, 1, -0.7]} intensity={1.2} color={SCREEN} distance={2.5} />
        <directionalLight position={[1.5, 2.5, 1.5]} intensity={0.5} castShadow />

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
