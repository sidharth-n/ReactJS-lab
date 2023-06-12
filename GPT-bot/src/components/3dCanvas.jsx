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
  PerspectiveCamera,
} from "@react-three/drei";
import { useRef, useEffect } from "react";

function BackgroundAnimation({ animationName }) {
  const model = useGLTF("./ak_talk.glb");
  const stage = useGLTF("./stage3.glb");

  model.scene.scale.set(1.2, 1.2, 1.2);
  model.scene.position.set(2.4, 0, 0);
  model.scene.rotation.set(0, -Math.PI / 2, 0);
  stage.scene.rotation.set(0, -Math.PI / 2, 0);
  stage.scene.position.set(3, 0, 0.07);
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
      <PerspectiveCamera
        makeDefault
        position={[0, 0.6, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fov={60}
      ></PerspectiveCamera>
      {/*      <Environment
        ground={{
          height: 20,
          radius: 50,
          scale: 500,
        }}
        files={"./studio.hdr"}
      /> */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 10, 10]} intensity={1} />
      <primitive object={model.scene} receiveShadow />
      <primitive object={stage.scene} receiveShadow />
      {/* <OrbitControls /> */}
    </>
  );
}

export { BackgroundAnimation };
