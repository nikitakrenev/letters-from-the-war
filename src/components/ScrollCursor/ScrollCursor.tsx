import React, { useContext } from 'react'
import styles from './ScrollCursor.module.css'
import { useMousePosition } from '../../hooks/useMousePosition'
import { CursorContext } from '../App/App'

export const ScrollCursor = () => {
  const position = useMousePosition();

  const cursorContext = useContext(CursorContext)
  const cursorDisplay = cursorContext.scroll ? 'block' : 'none'

  return (
    <div className={styles.cursor} style={{left: `${position.x - 33}px`, top: `${position.y - 14}px`, display: cursorDisplay}}>
      scroll
    </div>
  )
}