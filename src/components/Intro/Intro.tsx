import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from 'react'
import { HoldButton } from '../HoldButton/HoldButton'
import { Fade } from '../Fade/Fade'
import { TAppScreens } from '../../types'
import { useFade } from '../../hooks/useFade'
import { useWindowSize } from '../../hooks/useWindowSize'
import { DustService, TDustTextInfo } from '../../services/dust'
import { PixiResourcesContext } from '../AssetLoader/AssetLoader'
import styles from './Intro.module.css'
import { CursorContext } from '../App/App'

interface IIntroProps {
  setScreen: (screen: TAppScreens) => void
  fadeInOutroButton: () => void
  resetOutroButtonAnimation: () => void
}

export const Intro = ({
  setScreen,
  fadeInOutroButton,
  resetOutroButtonAnimation,
}: IIntroProps) => {
  const pixiResourcesContext = useContext(PixiResourcesContext)

  const cursorContext = useContext(CursorContext)

  const yearsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  const { fadeOut } = useFade([textRef, buttonRef, yearsRef], {
    distance: 30,
    duration: 1,
    stagger: 0.5,
    autoStartFadeIn: true,
  })

  const dustTexts = useMemo(
    (): TDustTextInfo[] => [
      {
        text: 'Letters from the war',
        sizePercent: 6,
        position: { x: 0.2, y: 0.2 },
        textColor: 'white',
        big: true,
      },
    ],
    []
  )

  const buttonOnStart = useCallback(() => {
    dustTexts.forEach((info) =>
      dustService.current?.startAnimationByText(info.text)
    )
  }, [dustTexts])

  const buttonOnComplete = useCallback(() => {
    fadeOut(() => {
      setScreen('selection')
      resetOutroButtonAnimation()
      fadeInOutroButton()
    })
    cursorContext.showScroll(true)
  }, [fadeOut, fadeInOutroButton, resetOutroButtonAnimation, setScreen, cursorContext])

  const buttonOnCancel = useCallback(() => {
    dustTexts.forEach((info) => {
      dustService.current?.stopAnimationByText(info.text)
    })
  }, [dustTexts])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dustService = useRef<DustService | null>(null)
  const windowSize = useWindowSize()

  const regenerateDustTexts = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    dustService.current = new DustService(
      pixiResourcesContext,
      canvas,
      dustTexts
    )
    return () => dustService.current?.stopService()
  }, [pixiResourcesContext, dustTexts])

  useEffect(regenerateDustTexts, [windowSize])

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div style={{ height: '17vh' }} />

      <Fade ref={yearsRef} className={styles.years}>
        <span>1941</span>
        <span className={styles.dash} />
        <span>1945</span>
      </Fade>

      <div style={{ height: '2vh' }} />

      <Fade ref={buttonRef}>
        <HoldButton
          text="hold to discover"
          className={styles.button}
          onStart={buttonOnStart}
          onComplete={buttonOnComplete}
          onCancel={buttonOnCancel}
          size="normal"
        />
      </Fade>

      <Fade ref={textRef}>
        <p className={styles.text}>
          Each year is filled with events.
          <br />
          How did people see them at the front? What do they feel? How to live?
          <br />
          These questions will be answered by their letters...
        </p>
      </Fade>
    </div>
  )
}
