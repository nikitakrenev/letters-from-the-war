import React, { useEffect } from 'react'
import gsap from 'gsap'
import { useWindowSize } from './useWindowSize'
import { useNormalizedMouse } from './useNormalizedMouse'

export const useParallax = (
  layers: React.MutableRefObject<HTMLDivElement | null>[],
  ratios: number[],
  centered = false
) => {
  const windowSize = useWindowSize()
  const normalizedMouse = useNormalizedMouse()
  useEffect(() => {
    const centerOffset = centered ? 0.5 : 0
    const timeline = gsap.timeline({ defaults: { duration: 0.5 } })
    const xOffsets = ratios.map(
      (ratio) =>
        ((normalizedMouse.x - centerOffset) * ratio * windowSize.x) / 100
    )
    const yOffsets = ratios.map(
      (ratio) =>
        ((normalizedMouse.y - centerOffset) * ratio * windowSize.y) / 100
    )
    layers.map((layer, i) =>
      timeline.add(
        gsap.to(layer.current, { x: xOffsets[i], y: yOffsets[i] }),
        0
      )
    )
    return () => void timeline.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedMouse, windowSize])
}
