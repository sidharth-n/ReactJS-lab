import React, { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const PointCloud = ({ progress, initialColor, progressColor }) => {
  const pointsRef = useRef()
  const numPoints = 5000
  const clusterSize = Math.floor(numPoints * 0.05) // 5% cluster size

  const [positions, colors, clusters] = useMemo(() => {
    const pos = new Float32Array(numPoints * 3)
    const col = new Float32Array(numPoints * 3)
    const cls = new Array(20).fill().map(() => new Set())

    for (let i = 0; i < numPoints; i++) {
      // Create elliptical sphere shape
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 2.5 + Math.random() * 0.5

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.5 // Stretch horizontally
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      col[i * 3] = initialColor.r
      col[i * 3 + 1] = initialColor.g
      col[i * 3 + 2] = initialColor.b
    }

    return [pos, col, cls]
  }, [initialColor])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  useEffect(() => {
    const newColors = colors.slice()
    const numClusters = Math.floor(progress / 5)
    const clusterIndices = new Set(
      clusters.slice(0, numClusters).flatMap(s => [...s])
    )

    for (let i = 0; i < numClusters; i++) {
      if (clusters[i].size === 0) {
        let seedIndex
        do {
          seedIndex = Math.floor(Math.random() * numPoints)
        } while (clusterIndices.has(seedIndex))

        const queue = [seedIndex]

        while (queue.length > 0 && clusters[i].size < clusterSize) {
          const currentIndex = queue.shift()
          if (!clusterIndices.has(currentIndex)) {
            clusters[i].add(currentIndex)
            clusterIndices.add(currentIndex)

            for (let j = 0; j < numPoints; j++) {
              if (clusterIndices.has(j)) continue
              const dx = positions[j * 3] - positions[currentIndex * 3]
              const dy = positions[j * 3 + 1] - positions[currentIndex * 3 + 1]
              const dz = positions[j * 3 + 2] - positions[currentIndex * 3 + 2]
              const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
              if (distance < 0.5) {
                queue.push(j)
              }
            }
          }
        }
      }

      clusters[i].forEach(index => {
        newColors[index * 3] = progressColor.r
        newColors[index * 3 + 1] = progressColor.g
        newColors[index * 3 + 2] = progressColor.b
      })
    }

    if (progress === 100) {
      for (let i = 0; i < numPoints * 3; i += 3) {
        newColors[i] = progressColor.r
        newColors[i + 1] = progressColor.g
        newColors[i + 2] = progressColor.b
      }
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(newColors, 3))
    geometry.attributes.color.needsUpdate = true
  }, [progress, geometry, positions, clusters, progressColor])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

const ProgressComponent3D = () => {
  const [progress, setProgress] = useState(0)
  const [initialColor, setInitialColor] = useState({ r: 0.2, g: 0.5, b: 1 })
  const [progressColor, setProgressColor] = useState({ r: 1, g: 0.3, b: 0.3 })

  const incrementProgress = () => {
    setProgress(prev => Math.min(prev + 5, 100))
  }

  const handleInitialColorChange = e => {
    const color = new THREE.Color(e.target.value)
    setInitialColor({ r: color.r, g: color.g, b: color.b })
  }

  const handleProgressColorChange = e => {
    const color = new THREE.Color(e.target.value)
    setProgressColor({ r: color.r, g: color.g, b: color.b })
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 10]} intensity={0.5} />
        <PointCloud
          progress={progress}
          initialColor={initialColor}
          progressColor={progressColor}
        />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
      <div className="fixed bottom-2 flex flex-col items-center">
        <div className="mb-2 flex space-x-2">
          <label className="text-white">
            Initial Color:
            <input
              type="color"
              value={`#${new THREE.Color(
                initialColor.r,
                initialColor.g,
                initialColor.b
              ).getHexString()}`}
              onChange={handleInitialColorChange}
            />
          </label>
          <label className="text-white">
            Progress Color:
            <input
              type="color"
              value={`#${new THREE.Color(
                progressColor.r,
                progressColor.g,
                progressColor.b
              ).getHexString()}`}
              onChange={handleProgressColorChange}
            />
          </label>
        </div>
        <button
          onClick={incrementProgress}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Increase Progress ({progress}%)
        </button>
      </div>
    </div>
  )
}

export default ProgressComponent3D
