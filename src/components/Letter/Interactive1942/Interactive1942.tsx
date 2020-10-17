import React, { useRef, useEffect, useContext, useCallback } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { SoundContext } from '../../App/App'
import { useParallax } from '../../../hooks/useParallax'
import { useWindowSize } from '../../../hooks/useWindowSize'
import styles from './Interactive1942.module.css'

export const Interactive1942 = () => {
  const soundContext = useContext(SoundContext)

  useEffect(() => soundContext.startLoop('battle'), [soundContext])

  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const layer4Ref = useRef<HTMLDivElement>(null)

  useParallax(
    [layer1Ref, layer2Ref, layer3Ref, layer4Ref],
    [2.4, 1.8, 1.2, 0.6]
  )

  const ballRef = useRef<HTMLDivElement>(null)
  const ballShadeRef = useRef<HTMLDivElement>(null)
  const ballShadowRef = useRef<HTMLDivElement>(null)
  const ballTimeline = useRef(
    gsap.timeline({
      paused: true,
      defaults: { ease: 'back.inOut(1.7)', duration: 3 },
    })
  )

  const windowSize = useWindowSize()

  useEffect(() => {
    const ball = ballRef.current
    const ballShade = ballShadeRef.current
    const ballShadow = ballShadowRef.current
    if (!ball || !ballShade || !ballShadow) {
      return
    }
    const timeline = ballTimeline.current
    timeline.progress(0).clear()
    timeline.to([ball, ballShadow], {
      x: `+=${windowSize.x * 0.06}`,
    })
    timeline.to(ball, { rotation: 180 }, 0)
    timeline.to(ballShade, { rotation: -180 }, 0)
  }, [windowSize])

  const ballClickHandler = useCallback(() => {
    const progress = ballTimeline.current.progress()
    if (progress === 0) {
      ballTimeline.current.play()
    } else if (progress === 1) {
      ballTimeline.current.reverse()
    }
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div ref={layer4Ref} className={styles.imageLayer}>
          <div className={clsx(styles.image, styles.layer4Right)} />
        </div>

        <div ref={layer3Ref} className={styles.imageLayer}>
          <div className={clsx(styles.image, styles.layer3Right)} />
          <div className={clsx(styles.image, styles.layer3Left)} />
        </div>

        <div ref={layer2Ref} className={styles.imageLayer}>
          <div className={clsx(styles.image, styles.layer2Center)} />
          <div ref={ballShadowRef} className={styles.ballShadow} />
          <div ref={ballRef} className={styles.ball} onClick={ballClickHandler}>
            <div ref={ballShadeRef} className={styles.ballShade} />
          </div>
        </div>

        <div
          ref={layer1Ref}
          className={styles.imageLayer}
          style={{ pointerEvents: 'none' }}
        >
          <div className={clsx(styles.image, styles.layer1Right)} />
        </div>
      </div>
    </div>
  )
}
