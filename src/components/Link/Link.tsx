import React, { useContext } from 'react'
import clsx from 'clsx'
import { CursorContext } from '../App/App'
import styles from './Link.module.css'

interface ILinkProps {
  href: string
  className?: string
}

export const Link = ({ href, className }: ILinkProps) => {
  const cursorContext = useContext(CursorContext)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(styles.root, className)}
      onMouseEnter={() => cursorContext.toDot()}
      onMouseLeave={() => cursorContext.toNormal()}
    >
      {href}
    </a>
  )
}
