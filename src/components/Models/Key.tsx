/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    key: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export const Key = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()

  const { nodes, materials } = useLoader<GLTFResult>(GLTFLoader, '3d/key.gltf')

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials.Material} geometry={nodes.key.geometry} />
    </group>
  )
}
