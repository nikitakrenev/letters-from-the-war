import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Fade } from '../Fade/Fade'
import { useFade } from '../../hooks/useFade'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './Illustration.module.css'

interface IIllustrationProps {
  image?: string
  imageAlt?: string
  text: string
  position: number
}

export const Illustration = ({
  image,
  imageAlt,
  text,
  position,
}: IIllustrationProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)

  const { fadeIn } = useFade([fadeRef], { distance: 60, duration: 2 })
  const [inView] = useIntersectionObserver(fadeRef, { threshold: 0.6 })

  useEffect(() => {
    inView && fadeIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    let tween: gsap.core.Tween
    const scrollListener = () => {
      const root = rootRef.current
      if (!root) {
        return
      }
      const scrollPercent = window.pageYOffset / document.body.clientHeight
      tween && tween.kill()
      tween = gsap.to(root, {
        y: -1000 * scrollPercent,
        duration: 1.8,
        ease: 'power1.out',
      })
    }
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <div ref={rootRef} className={styles.root} style={{ top: `${position}%` }}>
      <Fade ref={fadeRef}>
        {image && imageAlt && (
          <div
            role="img"
            aria-label={imageAlt}
            style={{ backgroundImage: `url(${image}` }}
            className={styles.image}
          />
        )}
        <p className={styles.text}>{text}</p>
      </Fade>
    </div>
  )
}
