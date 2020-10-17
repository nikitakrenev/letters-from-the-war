import { useWindowSize } from './useWindowSize'
import { useMousePosition } from './useMousePosition'
import { Vector2 } from '../types'

export const useNormalizedMouse = (centered = false): Vector2 => {
  const windowSize = useWindowSize()
  const mousePosition = useMousePosition()
  const offset = centered ? -0.5 : 0
  return {
    x: mousePosition.x / windowSize.x - offset,
    y: mousePosition.y / windowSize.y - offset,
  }
}
