import { useState, useEffect } from 'react'
import { Vector2 } from '../types'

export const useMousePosition = () => {
  const [position, setPosition] = useState<Vector2>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  })

  return position
}
