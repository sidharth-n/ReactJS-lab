import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import earth from "./earth.jpg";

function Earth() {
  const meshRef = useRef();

  // Rotate the earth on each frame
  useFrame(() => {
    meshRef.current.rotation.y += 0.005;
  });

  // Load the earth texture
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load(earth);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhongMaterial map={earthTexture} />
      <pointLight intensity={1} position={[10, 10, 10]} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgb(44, 44, 44)",
      }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <Earth />
      <ambientLight intensity={0.1} />
    </Canvas>
  );
}

export default App;
