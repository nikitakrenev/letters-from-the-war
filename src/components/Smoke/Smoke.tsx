import React, { useEffect, useRef, useContext } from 'react'
import { SmokeService } from '../../services/smoke'
import { PixiResourcesContext } from '../AssetLoader/AssetLoader'
import styles from './Smoke.module.css'

export let smokeService: SmokeService | null = null

export const Smoke = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixiResourcesContext = useContext(PixiResourcesContext)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      smokeService = new SmokeService(pixiResourcesContext, canvas)
      smokeService.startAnimation()
    }
    return () => smokeService?.stopService()
  }, [pixiResourcesContext])

  return <canvas className={styles.root} ref={canvasRef} />
}
