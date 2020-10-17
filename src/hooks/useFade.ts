import gsap from 'gsap'
import { useEffect, useCallback, useRef } from 'react'

type TFadeAnimation = (
  refs: React.RefObject<HTMLDivElement>[],
  options: {
    distance: number
    duration: number | { fadeIn: number; fadeOut: number }
    stagger?: number
    autoStartFadeIn?: boolean
    setDisplayNone?: boolean
  }
) => {
  fadeIn: () => gsap.core.Timeline
  fadeOut: (onComplete?: gsap.Callback) => gsap.core.Timeline
}

export const useFade: TFadeAnimation = (refs, options) => {
  const innerRefs = useRef(refs)

  let fadeInDuration: number
  let fadeOutDuration: number
  if (typeof options.duration === 'number') {
    fadeInDuration = options.duration
    fadeOutDuration = options.duration
  } else {
    fadeInDuration = options.duration.fadeIn
    fadeOutDuration = options.duration.fadeOut
  }

  const fadeIn = useCallback(() => {
    const fadeInTimeline = gsap.timeline()
    const elements = innerRefs.current
      .filter((ref) => ref.current !== null)
      .map((ref) => ref.current)
    if (options.setDisplayNone) {
      fadeInTimeline.set(elements, { clearProps: 'display' })
    }
    return fadeInTimeline.fromTo(
      elements,
      {
        autoAlpha: 0,
        y: options.distance,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: fadeInDuration,
        stagger: options.stagger,
      }
    )
  }, [
    fadeInDuration,
    options.distance,
    options.stagger,
    options.setDisplayNone,
  ])

  const fadeOut = useCallback(
    (onComplete?: gsap.Callback) => {
      const fadeOutTimeline = gsap.timeline()
      const elements = innerRefs.current.map((ref) => ref.current).reverse()
      fadeOutTimeline.to(elements, {
        autoAlpha: 0,
        y: -options.distance,
        duration: fadeOutDuration,
        stagger: options.stagger,
        onComplete,
      })
      if (options.setDisplayNone) {
        fadeOutTimeline.set(elements, { display: 'none' })
      }
      return fadeOutTimeline
    },
    [fadeOutDuration, options.distance, options.stagger, options.setDisplayNone]
  )

  useEffect(() => {
    if (options.setDisplayNone) {
      const elements = innerRefs.current.map((ref) => ref.current)
      gsap.set(elements, { display: 'none' })
    }
    if (options.autoStartFadeIn) {
      fadeIn()
    }
  }, [fadeIn, options.autoStartFadeIn, options.setDisplayNone])

  return { fadeIn, fadeOut }
}
