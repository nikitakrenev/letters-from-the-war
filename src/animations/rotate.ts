import gsap from 'gsap'
import * as THREE from 'three'
import { Vector2 } from '../types'

export const rotateToMouse = (
  rotation: THREE.Euler,
  normalizedMouse: Vector2
) => {
  const tween = gsap.to(rotation, {
    x: normalizedMouse.y - 0.5,
    y: normalizedMouse.x - 0.5,
    duration: 1.5,
  })
  return () => void tween.kill()
}
