"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function MouseParallaxCamera() {
  const target = useRef(new THREE.Vector3(0, 1.2, 0));
  const { pointer } = useThree();

  useFrame((state) => {
    const camera = state.camera;

    const targetX = 1.6 + pointer.x * 0.4;
    const targetY = 1.5 - pointer.y * 0.2;

    camera.position.x +=
      (targetX - camera.position.x) * 0.04;

    camera.position.y +=
      (targetY - camera.position.y) * 0.04;

    camera.lookAt(target.current);
  });

  return null;
}