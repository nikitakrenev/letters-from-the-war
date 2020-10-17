import React, { useRef, useEffect } from 'react'
import clsx from 'clsx'
import { Fade } from '../Fade/Fade'
import { useFade } from '../../hooks/useFade'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './Paragraph.module.css'

interface IParagraphProps {
  text: string
}

export const Paragraph: React.FC<IParagraphProps> = ({ text }) => {
  const fadeRef = useRef<HTMLDivElement>(null)

  const { fadeIn } = useFade([fadeRef], { distance: 60, duration: 2 })

  const [inView] = useIntersectionObserver(fadeRef, { threshold: 0.6 })

  useEffect(() => {
    inView && fadeIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  let element: React.ReactElement

  if (text.startsWith('- ')) {
    element = <aside className={styles.aside}>{text.substr(2)}</aside>
  } else if (text.startsWith('# ')) {
    element = (
      <p className={clsx(styles.paragraph, styles.censored)}>
        {text.substr(2)}
      </p>
    )
  } else if (text.startsWith('_ ')) {
    element = (
      <p className={clsx(styles.paragraph, styles.smallerMargin)}>
        {text.substr(2)}
      </p>
    )
  } else {
    element = <p className={styles.paragraph}>{text}</p>
  }

  return <Fade ref={fadeRef}>{element}</Fade>
}
