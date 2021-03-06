/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    letter: THREE.Mesh
  }
  materials: {
    ['1']: THREE.MeshStandardMaterial
  }
}

export const Letter = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>()

  const { nodes, materials } = useLoader<GLTFResult>(
    GLTFLoader,
    '3d/letter.gltf'
  )

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials['1']} geometry={nodes.letter.geometry} />
    </group>
  )
}
