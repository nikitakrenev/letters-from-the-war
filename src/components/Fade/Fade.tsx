import React from 'react'
import clsx from 'clsx'
import styles from './Fade.module.css'

interface IFadeProps extends React.HTMLProps<HTMLDivElement> {
  inheritCss?: boolean
}

export const Fade = React.forwardRef<HTMLDivElement, IFadeProps>(function Fade(
  { inheritCss, className, children },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(styles.root, inheritCss && styles.inherit, className)}
    >
      {children}
    </div>
  )
})
