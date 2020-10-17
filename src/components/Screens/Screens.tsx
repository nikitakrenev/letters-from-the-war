import React, {
  useState,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import gsap from 'gsap'
import { Intro } from '../Intro/Intro'
import { Selection } from '../Selection/Selection'
import { Outro } from '../Outro/Outro'
import { Fade } from '../Fade/Fade'
import { HoldButton } from '../HoldButton/HoldButton'
import { TAppScreens, TSoundButtonColor } from '../../types'
import { useFade } from '../../hooks/useFade'
import { smokeService } from '../Smoke/Smoke'
import { SoundContext, DirtContext } from '../App/App'
import { imageAssetSources } from '../../assets'
import styles from './Screens.module.css'

interface IScreensProps {
  setSoundButtonColor: React.Dispatch<React.SetStateAction<TSoundButtonColor>>
}

export const Screens = ({ setSoundButtonColor }: IScreensProps) => {
  const soundContext = useContext(SoundContext)
  const dirtContext = useContext(DirtContext)

  const [currentScreen, setCurrentScreen] = useState<TAppScreens>('intro')

  useEffect(() => {
    if (currentScreen === 'intro' || currentScreen === 'selection') {
      soundContext.stopLoop('brownThrashes')
      soundContext.startLoop('projector')
      setSoundButtonColor('white')
    } else if (currentScreen === 'outro') {
      soundContext.stopLoop('projector')
      soundContext.startLoop('brownThrashes')
      setSoundButtonColor('black')
    }
  }, [currentScreen, setSoundButtonColor, soundContext])

  const overlayPngRef = useRef<HTMLImageElement>(null)
  const overlayWebpRef = useRef<HTMLSourceElement>(null)
  const frames = 93
  const spritesheetWidth = 10
  const spritesheetHeight = 10
  const overlayAnimationDuration = 3

  const timelineRef = useRef(gsap.timeline({ paused: true }))

  useEffect(() => {
    const overlayPng = overlayPngRef.current
    const overlayWebp = overlayWebpRef.current
    if (!overlayPng || !overlayWebp) {
      return
    }
    const timeline = timelineRef.current
    const animObj = { frame: 0 }
    timeline.set(overlayPng, { opacity: 0 })
    timeline.set(overlayWebp, { opacity: 0 })
    timeline.set(overlayPng, { opacity: 1 })
    timeline.set(overlayWebp, { opacity: 1 })
    timeline.add(
      gsap.to(animObj, {
        frame: frames,
        duration: overlayAnimationDuration,
        ease: `steps(${frames})`,
        onUpdate: () => {
          const x = (animObj.frame % spritesheetWidth) * -100
          const y =
            Math.floor((animObj.frame / spritesheetWidth) % spritesheetHeight) *
            -100
          overlayWebp.style.transform = `translate(${x}vw, ${y}vh)`
          overlayPng.style.transform = `translate(${x}vw, ${y}vh)`
          if (animObj.frame > 50) {
            setCurrentScreen('outro')
          } else {
            setCurrentScreen('selection')
          }
        },
      })
    )
    timeline.set(overlayPng, { opacity: 0 })
    timeline.set(overlayWebp, { opacity: 0 })
    return () => void timeline.reverse()
  }, [])

  const outroButtonRef = useRef<HTMLDivElement>(null)

  const { fadeIn: fadeInOutroButton, fadeOut: fadeOutOutroButton } = useFade(
    [outroButtonRef],
    {
      distance: 30,
      duration: 1,
      stagger: 0.5,
      setDisplayNone: true,
    }
  )

  const outroButtonOnStart = useCallback(() => {
    timelineRef.current.play()
  }, [])

  const outroButtonOnCancel = useCallback(() => {
    timelineRef.current.reverse()
  }, [])

  const outroButtonOnComplete = useCallback(() => {
    dirtContext.setEnabled(false)
    fadeOutOutroButton()
    smokeService?.stopAnimation()
  }, [dirtContext, fadeOutOutroButton])

  const resetOutroButtonAnimation = useCallback(() => {
    timelineRef.current.restart().pause()
  }, [])

  let screen: ReactNode =
    currentScreen === 'intro' ? (
      <Intro
        setScreen={setCurrentScreen}
        fadeInOutroButton={fadeInOutroButton}
        resetOutroButtonAnimation={resetOutroButtonAnimation}
      />
    ) : currentScreen === 'selection' ? (
      <Selection
        setScreen={setCurrentScreen}
        fadeInOutroButton={fadeInOutroButton}
        fadeOutOutroButton={fadeOutOutroButton}
      />
    ) : currentScreen === 'outro' ? (
      <Outro setScreen={setCurrentScreen} />
    ) : null

  return (
    <div className={styles.root}>
      {screen}
      <picture>
        <source
          ref={overlayWebpRef}
          srcSet={imageAssetSources.filmOverlay.webp}
          type="image/webp"
          className={styles.filmOverlay}
        />
        <img
          ref={overlayPngRef}
          src={imageAssetSources.filmOverlay.png}
          alt=""
          className={styles.filmOverlay}
        />
      </picture>

      <Fade ref={outroButtonRef} className={styles.outroButtonFade}>
        <HoldButton
          text={'75\nyears'}
          className={styles.outroButton}
          textClassName={styles.outroButtonText}
          size="small"
          duration={overlayAnimationDuration}
          multipleUse
          onStart={outroButtonOnStart}
          onCancel={outroButtonOnCancel}
          onComplete={outroButtonOnComplete}
        />
      </Fade>
    </div>
  )
}
