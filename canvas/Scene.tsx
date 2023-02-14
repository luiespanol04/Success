import { OrbitControls, Sky, Bounds, ContactShadows } from '@react-three/drei';
import React, {Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Malla';
import Mapa from './PruebaLotes';
import Ocean from './OceanSky'

function Scene({ ...props }: any) {
  // Everything defined in here will persist between route changes, only children are swapped [200, 80000, 1600]
  return (
    <Canvas shadows camera={{ position: [0, 12000, 3500], fov: 50}} {...props}>
      <directionalLight 
        castShadow  />
      <ambientLight intensity={0.4} />
      <spotLight castShadow intensity={8} angle={Math.PI / 10} penumbra={1}/>
      <pointLight position={[100, 100, 100]} />
      <Bounds fit clip margin={0.6}>
        <Mapa/>
        {/* <Model/> */}
      </Bounds>
  
       <Suspense fallback={null}>
        {/* <Ocean /> */}
      </Suspense>
      <Sky distance={50000} sunPosition={[200, 500, 3000]}  turbidity={0.1} />
      <OrbitControls
        maxDistance={7000}
        minDistance={10}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.25}
      />
    </Canvas>
  );
}
export default Scene;
// #575b5e
