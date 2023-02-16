/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from 'react'
import { useGLTF, useBounds } from '@react-three/drei'

export default function MapGeneral(props) {
  const { nodes, materials } = useGLTF('models/ZA.glb')
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const api = useBounds();
  console.log(ref.current);

  return (
    <group scale={0.20} {...props} dispose={null} ref={ref}>
      <mesh material-color={"red"} geometry={nodes.Brep.geometry} material={materials['a0000000-0000-0000-0000-000000000000']} />
      <mesh geometry={nodes.Brep001.geometry} material={materials['a0000000-0000-0000-0000-000000000000']} />
      <mesh geometry={nodes.Brep002.geometry} material={materials['a0000000-0000-0000-0000-000000000000']} />
    </group>
  )
}

useGLTF.preload('models/MapGeneral.glb')
