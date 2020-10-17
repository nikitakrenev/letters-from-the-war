import React, { useEffect } from 'react'
import gsap from 'gsap'
import { notNull } from '../types'

export const useOverlay = (
  refs: React.MutableRefObject<HTMLElement | null>[],
  options: {
    frames: number
    width: number
    height: number
    duration: number
  }
) => {
  const innerRefs = refs.map((ref) => ref.current).filter(notNull)
  const { frames, width, height, duration } = options

  useEffect(() => {
    innerRefs.forEach((ref) => {
      ref.style.position = 'absolute'
      ref.style.top = '0'
      ref.style.left = '0'
      ref.style.width = `${width * 100}vw`
      ref.style.height = `${height * 100}vh`
      ref.style.pointerEvents = 'none'
      ref.style.visibility = 'visible'
    })
    const timeline = gsap.timeline()
    const animObj = { frame: 0 }
    let x: number
    let y: number
    timeline.add(
      gsap.to(animObj, {
        frame: frames,
        duration: duration,
        repeat: -1,
        ease: `steps(${frames})`,
        onUpdate: () => {
          x = (animObj.frame % width) * -100
          y = Math.floor((animObj.frame / width) & height) * -100
          innerRefs.forEach(
            (ref) => (ref.style.transform = `translate(${x}vw, ${y}vh)`)
          )
        },
      })
    )
    return () => void timeline.kill()
  }, [innerRefs, frames, width, height, duration])
}
