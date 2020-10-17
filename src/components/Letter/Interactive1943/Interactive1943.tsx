import React, { useRef, useContext, useEffect } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'
import { SoundContext } from '../../App/App'
import { useParallax } from '../../../hooks/useParallax'
import styles from './Interactive1943.module.css'
import { imageAssetSources } from '../../../assets'

const hammer = imageAssetSources.i1943Hammer.png

export const Interactive1943 = () => {
  const soundContext = useContext(SoundContext)

  useEffect(() => soundContext.startLoop('artillery'), [soundContext])

  const rootRef = useRef<HTMLDivElement>(null)
  const hammerRef = useRef<HTMLImageElement>(null)

  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const layer4Ref = useRef<HTMLDivElement>(null)

  const mouseEnterHandler = () => {
    const hammer = hammerRef.current
    if (hammer) {
      hammer.style.visibility = 'visible'
    }
  }

  const mouseMoveHandler = (e: React.MouseEvent) => {
    const root = rootRef.current
    const hammer = hammerRef.current
    if (!root || !hammer) {
      return
    }
    const rootRect = root.getBoundingClientRect()
    const hammerRect = hammer.getBoundingClientRect()
    hammer.style.top = `${e.clientY - rootRect.top}px`
    hammer.style.left = `${e.clientX - rootRect.left - hammerRect.width / 2}px`
  }

  const mouseLeaveHandler = () => {
    const hammer = hammerRef.current
    if (hammer) {
      hammer.style.visibility = 'hidden'
    }
  }

  const clickHandler = () => {
    const hammer = hammerRef.current
    if (!hammer) {
      return
    }
    soundContext.playRandom(['metalHit1', 'metalHit2', 'metalHit3'])
    const timeline = gsap.timeline()
    timeline
      .to(hammer, { rotation: 45, duration: 0.07 })
      .to(hammer, { rotation: 0, duration: 0.1 })
  }

  useParallax(
    [layer1Ref, layer2Ref, layer3Ref, layer4Ref],
    [2.4, 1.8, 1.2, 0.6]
  )

  return (
    <div
      ref={rootRef}
      className={styles.root}
      onMouseEnter={mouseEnterHandler}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div ref={layer4Ref} className={styles.imageLayer}>
        <div className={clsx(styles.image, styles.layer4Trees)} />
      </div>

      <div ref={layer3Ref} className={styles.imageLayer}>
        <div className={clsx(styles.image, styles.layer3Ground)} />
        <div className={clsx(styles.image, styles.layer3Tank)} />
      </div>

      <div ref={layer2Ref} className={styles.imageLayer}>
        <div
          className={clsx(styles.image, styles.layer2Tank)}
          onClick={clickHandler}
        />
        <div className={clsx(styles.image, styles.layer2Ground)} />
      </div>

      <div ref={layer1Ref} className={styles.imageLayer}>
        <div className={clsx(styles.image, styles.layer1Left)} />
        <div className={clsx(styles.image, styles.layer1Right)} />
      </div>

      <img src={hammer} alt="" ref={hammerRef} className={styles.hammer} />
    </div>
  )
}
