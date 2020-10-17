import { useState, useEffect } from 'react'
import { Vector2 } from '../types'

const getSize = (): Vector2 => ({
  x: window.innerWidth,
  y: window.innerHeight,
})

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
