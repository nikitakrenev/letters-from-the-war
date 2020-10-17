import React, { MouseEventHandler } from 'react'
import clsx from 'clsx'
import { Button } from '../Button/Button'
import styles from './CornerButton.module.css'

interface ICornerButtonProps {
  className?: string
  onClick: MouseEventHandler
}

export const CornerButton = ({ className, onClick }: ICornerButtonProps) => (
  <Button
    biggerArea
    className={clsx(styles.root, className)}
    hoverClassName={styles.hover}
    onClick={onClick}
  >
    Letters
    <br />
    from
    <br />
    the war
  </Button>
)
