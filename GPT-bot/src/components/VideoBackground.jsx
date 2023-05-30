import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const VideoBackground = () => {
  const { scene } = useThree(); // Access three.js scene via useThree hook

  // Create a video element
  const video = useMemo(() => {
    const vid = document.createElement("video");
    vid.src = "/hud.mp4"; // Video file in public folder
    vid.loop = true; // Video will loop
    vid.muted = true; // Video will be muted
    vid.play(); // Start playing the video
    return vid;
  }, []);

  // Create a texture from the video
  useEffect(() => {
    const texture = new THREE.VideoTexture(video);
    scene.background = texture; // Set scene background to video texture
  }, [scene, video]);

  return null; // This component does not render anything itself
};

export default VideoBackground;
