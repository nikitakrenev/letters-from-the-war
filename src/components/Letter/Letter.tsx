import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { Fact } from './Fact'
import { Paragraph } from './Paragraph'
import { Illustration } from './Illustration'
import { Interactive } from './Interactive'
import { Button } from '../Button/Button'
import { Fade } from '../Fade/Fade'
import { TYear } from '../../types'
import { letterContents } from './contents'
import { useFade } from '../../hooks/useFade'
import { useWindowSize } from '../../hooks/useWindowSize'
import { imageAssetSources } from '../../assets'
import styles from './Letter.module.css'

interface ILetter {
  year: TYear
  setModelVisibility: React.Dispatch<React.SetStateAction<boolean>>
  closeLetter: () => void
}

export const Letter = ({ year, setModelVisibility, closeLetter }: ILetter) => {
  const fadeRef = useRef<HTMLDivElement>(null)
  const chooseAnotherFadeRef = useRef<HTMLDivElement>(null)
  const [chooseAnotherVisible, setChooseAnotherVisibility] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayPngRef = useRef<HTMLImageElement>(null)
  const overlayWebpRef = useRef<HTMLSourceElement>(null)
  const [factTipVisible, setFactTipVisibility] = useState(true)
  const scroller = useRef({ y: 0, endY: 0, ease: 0.04 })

  const windowSize = useWindowSize()

  useFade([fadeRef], {
    distance: 30,
    duration: 1,
    autoStartFadeIn: true,
  })

  const {
    fadeIn: fadeInChooseAnother,
    fadeOut: fadeOutChooseAnother,
  } = useFade([chooseAnotherFadeRef], {
    distance: 30,
    duration: 1,
    setDisplayNone: true,
  })

  useEffect(() => {
    let rafId = 0
    gsap.set(contentRef.current, { rotation: 0.001 })
    const updateScroll = () => {
      const scrollY = window.pageYOffset
      scroller.current.endY = scrollY
      scroller.current.y +=
        (scrollY - scroller.current.y) * scroller.current.ease
      if (Math.abs(scrollY - scroller.current.y) < 0.05) {
        scroller.current.y = scrollY
      }
      gsap.set(contentRef.current, { y: -scroller.current.y })
      rafId = requestAnimationFrame(updateScroll)
    }
    updateScroll()
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const content = contentRef.current
    if (!content) {
      return
    }
    const scrollListener = () => {
      factTipVisible &&
        setFactTipVisibility(window.pageYOffset < window.innerHeight * 0.2)
      const chooseAnotherOffsetTrigger =
        document.body.clientHeight - window.innerHeight * 1.2
      setChooseAnotherVisibility(
        window.pageYOffset > chooseAnotherOffsetTrigger
      )
      setModelVisibility(window.pageYOffset < window.innerHeight * 0.1)
    }
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [factTipVisible, setModelVisibility])

  useEffect(() => {
    chooseAnotherVisible ? fadeInChooseAnother() : fadeOutChooseAnother()
  }, [chooseAnotherVisible, fadeInChooseAnother, fadeOutChooseAnother])

  useEffect(() => {
    const content = contentRef.current
    if (!content) {
      return
    }
    document.body.style.height = `${content.scrollHeight}px`
    return () => {
      document.body.style.removeProperty('height')
    }
  }, [windowSize])

  const frames = 36
  const spritesheetWidth = 10
  const spritesheetHeight = 4
  const overlayAnimationDuration = 1.5

  const overlayTimelineRef = useRef(gsap.timeline({ paused: true }))

  useEffect(() => {
    const overlayPng = overlayPngRef.current
    const overlayWebp = overlayWebpRef.current
    if (!overlayPng || !overlayWebp) {
      return
    }
    const timeline = overlayTimelineRef.current
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
          overlayPng.style.transform = `translate(${x}vw, ${y}vh)`
          overlayWebp.style.transform = `translate(${x}vw, ${y}vh)`
        },
        onComplete: closeLetter,
      })
    )
    return () => void timeline.kill()
  }, [closeLetter])

  const goBack = useCallback(() => overlayTimelineRef.current.play(), [])

  const content = letterContents[year]

  return (
    <Fade ref={fadeRef} inheritCss>
      <div className={styles.root}>
        <div ref={contentRef} className={styles.content}>
          <Fact paragraphs={content.fact} tipVisible={factTipVisible} />

          <div className={styles.columns}>
            <div className={styles.leftColumn}>
              <div className={styles.date}>
                <p>{content.date}</p>
                <p>{year}</p>
              </div>

              {content.illustrationsLeft.map((illustration, i) => (
                <Illustration {...illustration} key={i} />
              ))}
            </div>

            <div className={styles.centerColumn}>
              {content.mainText.map((text, i) => (
                <Paragraph text={text} key={i} />
              ))}
            </div>

            <div className={styles.rightColumn}>
              {content.author.map((authorLine, i) => (
                <p className={styles.author} key={i}>
                  {authorLine}
                </p>
              ))}

              {content.illustrationsRight.map((illustration, i) => (
                <Illustration {...illustration} key={i} />
              ))}
            </div>
          </div>

          <Interactive year={year} />
        </div>

        <Button biggerArea className={styles.back} onClick={goBack}>
          back
        </Button>

        <Fade ref={chooseAnotherFadeRef} inheritCss>
          <Button biggerArea className={styles.chooseAnother} onClick={goBack}>
            choose another story
          </Button>
        </Fade>

        <picture>
          <source
            ref={overlayWebpRef}
            srcSet={imageAssetSources.inkOverlay.webp}
            type="image/webp"
            className={styles.overlay}
          />
          <img
            ref={overlayPngRef}
            src={imageAssetSources.inkOverlay.png}
            alt=""
            className={styles.overlay}
          />
        </picture>
      </div>
    </Fade>
  )
}
