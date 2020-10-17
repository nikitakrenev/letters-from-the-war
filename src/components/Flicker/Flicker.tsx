import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { RoughEase } from 'gsap/EasePack'
import styles from './Flicker.module.css'

gsap.registerPlugin(RoughEase)

export const Flicker = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }
    const tween = gsap.to(root, {
      opacity: 0.04,
      ease: 'rough',
      duration: 0.3,
      repeat: -1,
    })
    return () => void tween.kill()
  }, [])

  return <div ref={rootRef} className={styles.root} />
}
