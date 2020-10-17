import React, { useRef, useEffect, useState, useContext } from 'react'
import { Fade } from '../Fade/Fade'
import { useFade } from '../../hooks/useFade'
import { DevelopmentContext } from '../App/App'
import { TPixiResources, videoAssetSources } from '../../assets'
import { loadFontAssets, loadImageAssets, loadPixiAssets } from '../../loaders'
import styles from './LoadingScreen.module.css'

interface ILoadingScreenProps {
  setPixiResources: React.Dispatch<React.SetStateAction<TPixiResources>>
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoadingScreen = ({
  setPixiResources,
  setLoaded,
}: ILoadingScreenProps) => {
  const developmentContext = useContext(DevelopmentContext)

  const fadeRef = useRef<HTMLDivElement>(null)

  const { fadeOut } = useFade([fadeRef], {
    distance: 30,
    duration: 1,
    autoStartFadeIn: true,
  })

  const [pixiLoaded, setPixiLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [timeoutDone, setTimeoutDone] = useState(false)

  const timeoutDuration = developmentContext.enabled ? 0 : 5000

  useEffect(() => {
    if (pixiLoaded && imagesLoaded && fontsLoaded && timeoutDone) {
      fadeOut(() => setLoaded(true))
    }
  }, [fadeOut, setLoaded, pixiLoaded, imagesLoaded, fontsLoaded, timeoutDone])

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }
    loadFontAssets(() => setFontsLoaded(true))
    video.addEventListener(
      'canplaythrough',
      () => {
        window.setTimeout(() => setTimeoutDone(true), timeoutDuration)
        loadImageAssets(() => setImagesLoaded(true))
        loadPixiAssets((_, resources) => {
          setPixiResources(resources)
          setPixiLoaded(true)
        })
      },
      { once: true }
    )
  }, [setPixiResources, timeoutDuration])

  return (
    <Fade ref={fadeRef}>
      <div className={styles.root}>
        <video autoPlay loop muted playsInline ref={videoRef}>
          <source
            src={videoAssetSources.loadingAnimation.webm}
            type="video/webm"
          />
          <source
            src={videoAssetSources.loadingAnimation.mp4}
            type={'video/mp4'}
          />
        </video>
        {fontsLoaded && (
          <p className={styles.text}>
            Loading
            <span className={styles.dot1}>.</span>
            <span className={styles.dot2}>.</span>
            <span className={styles.dot3}>.</span>
          </p>
        )}
      </div>
    </Fade>
  )
}
