import React, { useRef, useEffect, useContext, useState, useMemo } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { CursorContext } from '../App/App'
import styles from './HoldButton.module.css'

type THoldButtonSize = 'normal' | 'small'

interface IHoldButtonProps {
  text: string
  size: THoldButtonSize
  duration?: number
  multipleUse?: boolean
  className?: string
  textClassName?: string
  onStart?: Function
  onComplete?: Function
  onCancel?: Function
}

type THoldButtonPath = {
  path: string
  ref: React.MutableRefObject<SVGPathElement | null>
  animObj: { value: number }
}

export const HoldButton = (props: IHoldButtonProps) => {
  const {
    text,
    size,
    duration,
    multipleUse,
    className,
    textClassName,
    onStart,
    onComplete,
    onCancel,
  } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const sectorRef1 = useRef<SVGPathElement>(null)
  const sectorRef2 = useRef<SVGPathElement>(null)
  const sectorRef3 = useRef<SVGPathElement>(null)
  const sectorRef4 = useRef<SVGPathElement>(null)
  const sectorRef5 = useRef<SVGPathElement>(null)
  const sectorRef6 = useRef<SVGPathElement>(null)
  const sectorRef7 = useRef<SVGPathElement>(null)
  const sectorRef8 = useRef<SVGPathElement>(null)
  const sectorRef9 = useRef<SVGPathElement>(null)
  const sectorRef10 = useRef<SVGPathElement>(null)
  const [hover, setHover] = useState(false)
  const [hold, setHold] = useState(false)
  const [pressed, setPressed] = useState(false)

  const cursorContext = useContext(CursorContext)

  const paths: THoldButtonPath[] = useMemo(
    () => [
      {
        path: 'M 50,1 A 49,49 0 0 1 61.26,2.371',
        ref: sectorRef1,
        animObj: { value: 100 },
      },
      {
        path: 'm 64.717,3.32 a 49,49 0 0 1 7.172,2.916',
        ref: sectorRef2,
        animObj: { value: 100 },
      },
      {
        path: 'M 78.813,10.496 A 49,49 0 0 1 95.285,31.48',
        ref: sectorRef3,
        animObj: { value: 100 },
      },
      {
        path: 'M 96.795,35.605 A 49,49 0 0 1 99,50 49,49 0 0 1 94.41,70.57',
        ref: sectorRef4,
        animObj: { value: 100 },
      },
      {
        path: 'M 89.674,78.654 A 49,49 0 0 1 59.305,98.074',
        ref: sectorRef5,
        animObj: { value: 100 },
      },
      {
        path: 'M 55.604,98.639 A 49,49 0 0 1 50,99 49,49 0 0 1 21.656,89.896',
        ref: sectorRef6,
        animObj: { value: 100 },
      },
      {
        path: 'M 18.17,87.178 A 49,49 0 0 1 16.13,85.322',
        ref: sectorRef7,
        animObj: { value: 100 },
      },
      {
        path: 'M 14.098,83.182 A 49,49 0 0 1 1,50 49,49 0 0 1 1.719,41.973',
        ref: sectorRef8,
        animObj: { value: 100 },
      },
      {
        path: 'M 4.113,32.984 A 49,49 0 0 1 15.74,15.094',
        ref: sectorRef9,
        animObj: { value: 100 },
      },
      {
        path: 'M 25.684,7.541 A 49,49 0 0 1 50,1',
        ref: sectorRef10,
        animObj: { value: 100 },
      },
    ],
    []
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const animationDuration = duration ? duration / paths.length : 0.15

    const timeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        document.removeEventListener('mouseup', mouseUpListener)
        document.removeEventListener('touchend', mouseUpListener)
        if (!multipleUse) {
          setPressed(true)
        } else {
          setHover(false)
          setHold(false)
          timeline.progress(0).pause()
        }
        cursorContext.toNormal()
        onComplete && onComplete()
      },
    })

    paths.forEach(({ ref, animObj }) => {
      timeline.add(
        gsap.to(animObj, {
          value: 0,
          duration: animationDuration,
          ease: 'linear',
          onUpdate: () =>
            ref.current &&
            (ref.current.style.strokeDashoffset = animObj.value.toString()),
        })
      )
    })

    const mouseDownListener = () => {
      if (pressed && !multipleUse) {
        return
      }
      setHold(true)
      cursorContext.toDot()
      onStart && onStart()
      timeline.play()
      document.addEventListener('mouseup', mouseUpListener, { once: true })
      document.addEventListener('touchend', mouseUpListener, { once: true })
    }
    root.addEventListener('mousedown', mouseDownListener)
    root.addEventListener('touchstart', mouseDownListener)

    const mouseUpListener = () => {
      onCancel && onCancel()
      setHold(false)
      timeline.reverse()
    }

    return () => {
      root.removeEventListener('mousedown', mouseDownListener)
      root.removeEventListener('touchstart', mouseDownListener)
    }
  }, [
    pressed,
    paths,
    duration,
    multipleUse,
    onStart,
    onComplete,
    onCancel,
    cursorContext,
  ])

  const sizeClasses: Record<THoldButtonSize, string> = {
    normal: styles.normal,
    small: styles.small,
  }

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, sizeClasses[size], className)}
      onMouseEnter={() => {
        setHover(true)
        cursorContext.toDot()
      }}
      onMouseLeave={() => {
        setHover(false)
        cursorContext.toNormal()
      }}
    >
      <div className={clsx(styles.wrapper, hover && !hold && styles.scale)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className={styles.circleSvg}
        >
          <g className={styles.pathStatic}>
            {paths.map(({ path }, i) => (
              <path d={path} key={i} />
            ))}
          </g>
          <g className={styles.pathGrowing}>
            {paths.map(({ path, ref }, i) => (
              <path d={path} ref={ref} key={i} pathLength="100" />
            ))}
          </g>
        </svg>
        <div role="button" className={styles.button}>
          <span className={clsx(styles.buttonText, textClassName)}>{text}</span>
        </div>
      </div>
    </div>
  )
}
