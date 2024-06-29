import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Plane, Box, Sphere, Cone, Sky, Environment } from '@react-three/drei';
import { useControls, button } from 'leva';
import * as THREE from 'three';

const Scene: React.FC<{ greeting: string, fogColor: string, fogNear: number, fogFar: number, materialProps: any, hdriPreset: string, hdriIntensity: number, hdriRotation: number }> = ({ greeting, fogColor, fogNear, fogFar, materialProps, hdriPreset, hdriIntensity, hdriRotation }) => {
  const boxRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (boxRef.current) boxRef.current.rotation.y += delta * 0.5;
    if (sphereRef.current) sphereRef.current.rotation.x += delta * 0.5;
    if (coneRef.current) coneRef.current.rotation.z += delta * 0.5;
  });

  return (
    <>
      <fog attach="fog" color={fogColor} near={fogNear} far={fogFar} />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <Environment
        preset={hdriPreset}
        background
        intensity={hdriIntensity}
        rotation={hdriRotation}
      />
      <Text position={[0, 2, 0]} fontSize={0.5} color="white">
        {greeting || "Enter a name and click 'Get Greeting'"}
      </Text>
      <Box ref={boxRef} args={[1, 1, 1]} position={[-2, 0, 0]}>
        <meshPhysicalMaterial {...materialProps} />
      </Box>
      <Sphere ref={sphereRef} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial {...materialProps} />
      </Sphere>
      <Cone ref={coneRef} args={[0.5, 1, 32]} position={[2, 0, 0]} rotation={[0, 0, Math.PI]}>
        <meshPhysicalMaterial {...materialProps} />
      </Cone>
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <meshStandardMaterial color="green" />
      </Plane>
      <OrbitControls />
    </>
  );
};

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');

  const { name, fogColor, fogNear, fogFar, hdriPreset, hdriIntensity, hdriRotation, materialColor, ...materialProps } = useControls({
    name: '',
    fogColor: { value: '#ffffff', label: 'Fog Color' },
    fogNear: { value: 1, min: 0.1, max: 20, step: 0.1, label: 'Fog Near' },
    fogFar: { value: 17, min: 1, max: 50, step: 1, label: 'Fog Far' },
    materialColor: { value: '#ffffff', label: 'Material Color' },
    clearcoat: { value: 0.0, min: 0.0, max: 1.0, step: 0.1, label: 'Clearcoat' },
    clearcoatRoughness: { value: 0.0, min: 0.0, max: 1.0, step: 0.1, label: 'Clearcoat Roughness' },
    transmission: { value: 0.0, min: 0.0, max: 1.0, step: 0.1, label: 'Transmission' },
    reflectivity: { value: 0.5, min: 0.0, max: 1.0, step: 0.1, label: 'Reflectivity' },
    sheen: { value: 0.0, min: 0.0, max: 1.0, step: 0.1, label: 'Sheen' },
    iridescence: { value: 0.0, min: 0.0, max: 1.0, step: 0.1, label: 'Iridescence' },
    ior: { value: 1.5, min: 1.0, max: 2.333, step: 0.1, label: 'Index of Refraction (IOR)' },
    hdriPreset: {
      options: {
        'Sunset': 'sunset',
        'Dawn': 'dawn',
        'Night': 'night',
        'Forest': 'forest',
        'City': 'city',
        'Apartment': 'apartment',
        'Lobby': 'lobby',
        'Park': 'park',
        'Studio': 'studio',
        'Warehouse': 'warehouse'
      },
      value: 'sunset',
      label: 'HDRI Preset'
    },
    hdriIntensity: { value: 1, min: 0, max: 5, step: 0.1, label: 'HDRI Intensity' },
    hdriRotation: { value: 0, min: 0, max: Math.PI * 2, step: 0.1, label: 'HDRI Rotation' },
    'Get Greeting': button((get) => {
      const name = get('name');
      if (name) {
        fetch(`http://localhost:8080/hey/${name}`)
          .then(response => response.text())
          .then(data => setGreeting(data))
          .catch(error => console.error('Error fetching greeting:', error));
      }
    }),
  });

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Scene 
          greeting={greeting} 
          fogColor={fogColor} 
          fogNear={fogNear} 
          fogFar={fogFar} 
          materialProps={{...materialProps, color: materialColor}} 
          hdriPreset={hdriPreset} 
          hdriIntensity={hdriIntensity} 
          hdriRotation={hdriRotation} 
        />
      </Canvas>
    </div>
  );
};

export default App;