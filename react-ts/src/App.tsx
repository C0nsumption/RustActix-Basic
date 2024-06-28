import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { useControls, button } from 'leva';

const Scene: React.FC<{ greeting: string }> = ({ greeting }) => {
  return (
    <>
      <Text position={[0, 0, 0]} fontSize={0.5} color="white">
        {greeting || "Enter a name and click 'Get Greeting'"}
      </Text>
      <OrbitControls />
    </>
  );
};

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');

  const { name } = useControls({
    name: '',
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
        <pointLight position={[10, 10, 10]} />
        <Scene greeting={greeting} />
      </Canvas>
    </div>
  );
};

export default App;