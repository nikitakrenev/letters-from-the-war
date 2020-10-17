import React, { useEffect, useRef, useContext } from 'react'
import clsx from 'clsx'
import { SoundContext } from '../../App/App'
import { useNormalizedMouse } from '../../../hooks/useNormalizedMouse'
import { useParallax } from '../../../hooks/useParallax'
import { noop } from '../../../utils'
import { imageAssetSources } from '../../../assets'
import styles from './Interactive1941.module.css'
import { AirService } from '../../../services/air'
import { PixiResourcesContext } from '../../AssetLoader/AssetLoader'

const { i1941Ray } = imageAssetSources

export const Interactive1941 = () => {
  const soundContext = useContext(SoundContext)

  useEffect(() => {
    const fadeOutLevitan = soundContext.fadeIn('levitanWarStarted')
    let fadeOutBattleSounds = noop
    const timeout = window.setTimeout(() => {
      fadeOutBattleSounds = soundContext.startLoop('battleSounds')
    }, 1000 * 60)
    return () => {
      window.clearTimeout(timeout)
      fadeOutBattleSounds()
      fadeOutLevitan()
    }
  }, [soundContext])

  const normalizedMouse = useNormalizedMouse()

  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const layer4Ref = useRef<HTMLDivElement>(null)

  useParallax(
    [layer1Ref, layer2Ref, layer3Ref, layer4Ref],
    [2.4, 1.8, 1.2, 0.6]
  )

  const airService = useRef<AirService | null>(null)
  const pixiResourcesContext = useContext(PixiResourcesContext)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    airService.current = new AirService(pixiResourcesContext, canvas)
    return () => airService.current?.stopService()
  }, [pixiResourcesContext])

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.imageLayer}>
          <img
            src={i1941Ray.png}
            alt=""
            className={clsx(styles.ray, styles.ray1)}
            style={{
              transform: `rotate(${normalizedMouse.x * 40 + 0}deg)`,
            }}
          />
          <img
            src={i1941Ray.png}
            alt=""
            className={clsx(styles.ray, styles.ray2)}
            style={{
              transform: `rotate(${normalizedMouse.x * 60 - 30}deg)`,
            }}
          />
          <img
            src={i1941Ray.png}
            alt=""
            className={clsx(styles.ray, styles.ray3)}
            style={{
              transform: `rotate(${normalizedMouse.x * 40 - 40}deg)`,
            }}
          />
        </div>

        <div ref={layer4Ref} className={styles.imageLayer}>
          <div className={clsx(styles.image, styles.layer4)} />
        </div>

        <canvas ref={canvasRef} className={styles.canvas} />

        <div ref={layer3Ref} className={styles.imageLayer}>
          <div className={clsx(styles.image, styles.layer3)} />
        </div>

        <div ref={layer2Ref} className={styles.imageLayer}>
          <div className={clsx(styles.image, styles.layer2)} />
        </div>

        <div ref={layer1Ref} className={styles.imageLayer}>
          <div className={clsx(styles.image, styles.layer1)} />
        </div>
      </div>
    </div>
  )
}
