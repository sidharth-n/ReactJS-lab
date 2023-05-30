import React from "react";
import { Canvas } from "react-three-fiber";
import {
  OrbitControls,
  useHelper,
  PivotControls,
  BakeShadows,
  AccumulativeShadows,
  Sky,
  Environment,
  Stage,
  useGLTF,
  Clone,
  useAnimations,
} from "@react-three/drei";
import { useRef, useEffect } from "react";

function BackgroundAnimation({ animationName }) {
  const model = useGLTF("./check.glb");

  model.scene.scale.set(1, 1, 1);
  model.scene.position.set(0, -0.6, 3.6);
  model.scene.rotation.set(0.3, 0, 0);
  const animations = useAnimations(model.animations, model.scene);
  console.log(animations);
  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [animationName]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 10, 10]} intensity={1} />
      <primitive object={model.scene} receiveShadow />
    </>
  );
}

export { BackgroundAnimation };
