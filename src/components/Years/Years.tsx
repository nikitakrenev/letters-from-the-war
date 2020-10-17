import React, { useRef, useEffect, useState, useContext, useMemo } from 'react'
import { DustService } from '../../services/dust'
import { CursorContext } from '../App/App'
import { PixiResourcesContext } from '../AssetLoader/AssetLoader'
import { years, TYear } from '../../types'
import { useWindowSize } from '../../hooks/useWindowSize'
import styles from './Years.module.css'
import { inRect } from '../../utils'

interface IYears {
  setHoveredYear: React.Dispatch<React.SetStateAction<TYear | null>>
  setSelectedYear: (year: TYear) => void
  fadeOutOutroButton: () => void
  interactive: boolean
  fadeOutAll: boolean
}

export const Years = ({
  setHoveredYear,
  setSelectedYear,
  fadeOutOutroButton,
  interactive,
  fadeOutAll,
}: IYears) => {
  const cursorContext = useContext(CursorContext)
  const pixiResourcesContext = useContext(PixiResourcesContext)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dustService = useRef<DustService | null>(null)

  const [hoverEnabled, setHoverEnabled] = useState(true)
  const [clickEnabled, setClickEnabled] = useState(true)

  useEffect(() => {
    if (fadeOutAll) {
      dustService.current?.fadeOutAll()
    }
  }, [fadeOutAll])

  const windowSize = useWindowSize()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    dustService.current = new DustService(pixiResourcesContext, canvas, [
      {
        text: '1941',
        sizePercent: 4,
        position: { x: 0.075, y: 0.46 },
        textColor: 'white',
      },
      {
        text: '1942',
        sizePercent: 4,
        position: { x: 0.27, y: 0.46 },
        textColor: 'white',
      },
      {
        text: '1943',
        sizePercent: 4,
        position: { x: 0.472, y: 0.46 },
        textColor: 'white',
      },
      {
        text: '1944',
        sizePercent: 4,
        position: { x: 0.67, y: 0.46 },
        textColor: 'white',
      },
      {
        text: '1945',
        sizePercent: 4,
        position: { x: 0.87, y: 0.46 },
        textColor: 'white',
      },
    ])
    return () => dustService.current?.stopService()
  }, [pixiResourcesContext, windowSize])

  const handlePointerOver = (year: TYear) => {
    if (interactive && hoverEnabled) {
      setHoveredYear(year)
      dustService.current?.hoverOver(year.toString())
    }
  }

  const handlePointerOut = (year: TYear) => {
    if (interactive && hoverEnabled) {
      setHoveredYear(null)
      dustService.current?.hoverOut(year.toString())
    }
  }

  const handleClick = (year: TYear) => {
    if (interactive && clickEnabled) {
      cursorContext.toNormal()
      setHoverEnabled(false)
      setClickEnabled(false)
      fadeOutOutroButton()
      dustService.current?.redrawByText(year.toString(), 'red')
      dustService.current?.startAnimationByText(year.toString(), true)
      setTimeout(() => setSelectedYear(year), 2400)
    }
  }

  const hover1941Ref = useRef<HTMLDivElement>(null)
  const hover1942Ref = useRef<HTMLDivElement>(null)
  const hover1943Ref = useRef<HTMLDivElement>(null)
  const hover1944Ref = useRef<HTMLDivElement>(null)
  const hover1945Ref = useRef<HTMLDivElement>(null)

  const yearToHoverRef: Record<
    TYear,
    React.MutableRefObject<HTMLDivElement | null>
  > = useMemo(
    () => ({
      1941: hover1941Ref,
      1942: hover1942Ref,
      1943: hover1943Ref,
      1944: hover1944Ref,
      1945: hover1945Ref,
    }),
    []
  )

  useEffect(() => {
    let dot = false
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !hoverEnabled) {
        return
      }
      const hovered = years.find((year) => {
        const rect = yearToHoverRef[year].current?.getBoundingClientRect()
        if (!rect) {
          return false
        }
        return inRect(e.clientX, e.clientY, rect)
      })
      if (hovered) {
        dot = true
        cursorContext.toDot()
      } else if (dot) {
        dot = false
        cursorContext.toNormal()
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive, hoverEnabled, cursorContext, yearToHoverRef])

  return (
    <div className={styles.root}>
      <ul className={styles.years}>
        {years.map((year) => (
          <li
            key={year}
            onPointerOver={() => handlePointerOver(year)}
            onPointerOut={() => handlePointerOut(year)}
            onClick={() => handleClick(year)}
          >
            <div ref={yearToHoverRef[year]} className={styles.hover} />
          </li>
        ))}
      </ul>

      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
