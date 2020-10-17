import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { SoundContext } from '../App/App'
import { smokeService } from '../Smoke/Smoke'
import { Fade } from '../Fade/Fade'
import { Models } from '../Models/Models'
import { Years } from '../Years/Years'
import { Letter } from '../Letter/Letter'
import { CornerButton } from '../CornerButton/CornerButton'
import { useFade } from '../../hooks/useFade'
import { TAppScreens, TYear } from '../../types'
import styles from './Selection.module.css'
import { ScrollCursor } from '../ScrollCursor/ScrollCursor'

interface ISelectionProps {
  setScreen: (screen: TAppScreens) => void
  fadeInOutroButton: () => void
  fadeOutOutroButton: () => void
}

export const Selection = ({
  setScreen,
  fadeInOutroButton,
  fadeOutOutroButton,
}: ISelectionProps) => {
  const soundContext = useContext(SoundContext)

  const [hoveredYear, setHoveredYear] = useState<TYear | null>(null)
  const [selectedYear, setSelectedYear] = useState<TYear | null>(null)
  const [modelVisible, setModelVisibility] = useState(true)
  const [yearsInteractive, setYearsInteractive] = useState(true)
  const [fadeOutAllYears, setFadeOutAllYears] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const cornerRef = useRef<HTMLDivElement>(null)

  const { fadeOut } = useFade([contentRef, cornerRef], {
    distance: 30,
    duration: 1,
    stagger: 0.5,
    autoStartFadeIn: true,
  })

  useEffect(() => {
    if (!smokeService) {
      return
    }
    if (selectedYear === null) {
      smokeService.startAnimation()
      soundContext.normalLoopVolume('projector')
    } else {
      smokeService.stopAnimation()
      soundContext.lowerLoopVolume('projector')
    }
  }, [soundContext, selectedYear])

  const closeLetter = useCallback(() => {
    fadeInOutroButton()
    setModelVisibility(true)
    setSelectedYear(null)
  }, [fadeInOutroButton])

  const cornerButtonClick = useCallback(() => {
    if (smokeService) {
      smokeService.startAnimation()
    }
    setFadeOutAllYears(true)
    setModelVisibility(false)
    setYearsInteractive(false)
    fadeOutOutroButton()
    soundContext.normalLoopVolume('projector')
    fadeOut(() => setScreen('intro'))
  }, [fadeOut, fadeOutOutroButton, setScreen, soundContext])

  return (
    <div className={styles.root}>
      <Models
        selectedYear={selectedYear}
        hoveredYear={hoveredYear}
        visible={modelVisible}
      />

      {(!selectedYear) && <ScrollCursor/>}

      <Fade ref={contentRef} inheritCss>
        {selectedYear === null ? (
          <Years
            setHoveredYear={setHoveredYear}
            setSelectedYear={setSelectedYear}
            fadeOutOutroButton={fadeOutOutroButton}
            interactive={yearsInteractive}
            fadeOutAll={fadeOutAllYears}
          />
        ) : (
          <Letter
            year={selectedYear}
            setModelVisibility={setModelVisibility}
            closeLetter={closeLetter}
          />
        )}
      </Fade>

      <Fade ref={cornerRef} inheritCss>
        <CornerButton onClick={cornerButtonClick} />
      </Fade>
    </div>
  )
}
