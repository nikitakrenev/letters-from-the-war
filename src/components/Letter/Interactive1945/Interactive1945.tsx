import React, { useRef, useEffect, useContext, useCallback } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import {
  FireworksService,
  fireworkClickDebounce,
} from '../../../services/fireworks'
import { useParallax } from '../../../hooks/useParallax'
import { SoundContext } from '../../App/App'
import { PixiResourcesContext } from '../../AssetLoader/AssetLoader'
import { noop, debounce, mapInterval } from '../../../utils'
import styles from './Interactive1945.module.css'

export const Interactive1945 = () => {
  const soundContext = useContext(SoundContext)

  useEffect(() => {
    const fadeOutLevitan = soundContext.fadeIn('levitanWarEnded')
    let fadeOutHooray = noop
    const timeout = window.setTimeout(() => {
      fadeOutHooray = soundContext.startLoop('hooray')
    }, 1000 * 50)
    return () => {
      window.clearTimeout(timeout)
      fadeOutHooray()
      fadeOutLevitan()
    }
  }, [soundContext])

  const fireworksService = useRef<FireworksService | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const glareTimeline = useRef(gsap.timeline({ paused: true }))

  useEffect(() => {
    const glare = glareRef.current
    if (!glare) {
      return
    }
    glareTimeline.current.add(
      gsap.to(glare, {
        opacity: 1,
        duration: 0.6,
        repeat: 1,
        yoyo: true,
        ease: 'power1.out',
        onComplete: () => glareTimeline.current.progress(0).pause(),
      })
    )
  }, [])

  const pixiResourcesContext = useContext(PixiResourcesContext)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      fireworksService.current = new FireworksService(
        pixiResourcesContext,
        canvas
      )
    }
    return () => fireworksService.current?.stopService()
  }, [pixiResourcesContext])

  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  useParallax([layer1Ref, layer2Ref, layer3Ref], [2.4, 1.8, 1.2])

  const canvasClick = useCallback(
    debounce((e: React.MouseEvent) => {
      soundContext.play('firework')
      const glare = glareRef.current
      const canvas = canvasRef.current
      if (!glare || !canvas) {
        return
      }
      const x = mapInterval(0, window.innerWidth, -15, 105, e.clientX)
      const y = mapInterval(0, window.innerHeight, 239, -200, e.clientY)
      glare.style.backgroundPosition = `${x}% ${y}%`
      glareTimeline.current.play()
    }, fireworkClickDebounce),
    [soundContext]
  )

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} className={styles.canvas} onClick={canvasClick} />

      <div ref={layer3Ref} className={styles.imageLayer}>
        <div className={clsx(styles.image, styles.layer3)}>
          <div ref={glareRef} className={styles.glare} />
        </div>
      </div>

      <div ref={layer2Ref} className={styles.imageLayer}>
        <div className={clsx(styles.image, styles.layer2)} />
      </div>

      <div ref={layer1Ref} className={styles.imageLayer}>
        <div className={clsx(styles.image, styles.layer1)} />
      </div>
    </div>
  )
}
