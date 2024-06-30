import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Plane, Sphere, Sky, Environment } from '@react-three/drei';
import { useControls, button, folder } from 'leva';
import * as THREE from 'three';

type HDRIPreset = "sunset" | "dawn" | "night" | "forest" | "city" | "apartment" | "lobby" | "park" | "studio" | "warehouse";

interface SceneProps {
  greeting: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  materialProps: THREE.MeshPhysicalMaterialParameters;
  hdriPreset: HDRIPreset;
  hdriIntensity: number;
  hdriRotation: number;
  showGroundPlane: boolean;
}

const Scene: React.FC<SceneProps> = ({
  greeting,
  fogColor,
  fogNear,
  fogFar,
  materialProps,
  hdriPreset,
  hdriIntensity,
  hdriRotation,
  showGroundPlane,
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const envRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (envRef.current) {
      envRef.current.rotation.y = hdriRotation;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <fog attach="fog" color={fogColor} near={fogNear} far={fogFar} />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <group ref={envRef}>
        <Environment
          preset={hdriPreset}
          background
          backgroundIntensity={hdriIntensity}
          environmentIntensity={hdriIntensity}
        />
      </group>
      <Text position={[0, 2, 0]} fontSize={0.5} color="white">
        {greeting || "Enter a name and click 'Get Greeting'"}
      </Text>
      <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial {...materialProps} />
      </Sphere>
      {showGroundPlane && (
        <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <meshStandardMaterial color="green" />
        </Plane>
      )}
      <OrbitControls 
        enablePan={false} 
        enableDamping={true}
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={10}
      />
    </>
  );
};

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');

  const {
    name,
    fogColor,
    fogNear,
    fogFar,
    hdriPreset,
    hdriIntensity,
    hdriRotation,
    materialColor,
    showGroundPlane,
    ...materialProps
  } = useControls({
    Greeting: folder({
      name: '',
      'Get Greeting': button((get) => {
        const name = get('Greeting.name');
        if (name) {
          fetch(`http://localhost:8080/hey/${name}`)
            .then(response => response.text())
            .then(data => setGreeting(data))
            .catch(error => console.error('Error fetching greeting:', error));
        }
      }),
    }, { collapsed: true }),
    Environment: folder({
      fogColor: { value: '#ffffff', label: 'Fog Color' },
      fogNear: { value: 1, min: 0.1, max: 20, step: 0.1, label: 'Fog Near' },
      fogFar: { value: 17, min: 1, max: 50, step: 1, label: 'Fog Far' },
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
      showGroundPlane: { value: false, label: 'Show Ground Plane' },
    }, { collapsed: true }),
    Material: folder({
      materialColor: { value: '#ffff00', label: 'Color' },
      clearcoat: { value: 0.5, min: 0.0, max: 1.0, step: 0.1, label: 'Clearcoat' },
      clearcoatRoughness: { value: 0.1, min: 0.0, max: 1.0, step: 0.1, label: 'Clearcoat Roughness' },
      transmission: { value: 0.6, min: 0.0, max: 1.0, step: 0.1, label: 'Transmission' },
      reflectivity: { value: 0.5, min: 0.0, max: 1.0, step: 0.1, label: 'Reflectivity' },
      sheen: { value: 0.4, min: 0.0, max: 1.0, step: 0.1, label: 'Sheen' },
      iridescence: { value: 0.5, min: 0.0, max: 1.0, step: 0.1, label: 'Iridescence' },
      ior: { value: 1.5, min: 1.0, max: 2.333, step: 0.1, label: 'Index of Refraction (IOR)' },
    }, { collapsed: true }),
  });

  const materialPhysicalProps: THREE.MeshPhysicalMaterialParameters = {
    ...materialProps,
    color: materialColor,
  };

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
          materialProps={materialPhysicalProps} 
          hdriPreset={hdriPreset as HDRIPreset} 
          hdriIntensity={hdriIntensity} 
          hdriRotation={hdriRotation}
          showGroundPlane={showGroundPlane}
        />
      </Canvas>
    </div>
  );
};

export default App;
