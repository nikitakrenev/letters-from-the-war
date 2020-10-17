import gsap from 'gsap'
import { RoughEase } from 'gsap/EasePack'
import { Vector2 } from '../types'
import { rand } from '../utils'

gsap.registerPlugin(RoughEase)

export const jitter = (position: Vector2) => {
  let tween: gsap.core.Tween
  const jitter = () => {
    tween = gsap.to(position, {
      x: rand(0.01),
      y: rand(0.05),
      duration: 0.15,
      ease: 'rough',
      onComplete: jitter,
    })
  }
  jitter()
  return () => {
    tween.kill()
  }
}
