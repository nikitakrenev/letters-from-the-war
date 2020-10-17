import React, {
  MouseEventHandler,
  useContext,
  useState,
  useCallback,
} from 'react'
import clsx from 'clsx'
import { CursorContext } from '../App/App'
import styles from './Button.module.css'

type TScaling = 'transform' | 'fontSize'

interface IButtonProps {
  scaling?: TScaling
  biggerArea?: boolean
  className?: string
  hoverClassName?: string
  onClick?: MouseEventHandler
  multipleUse?: boolean
}

export const Button: React.FC<IButtonProps> = ({
  biggerArea,
  className,
  hoverClassName,
  onClick,
  multipleUse,
  children,
  ...restProps
}) => {
  const cursorContext = useContext(CursorContext)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const scaling = restProps.scaling || 'transform'

  const classesRoot = clsx(
    styles.root,
    className,
    (hovered || clicked) && hoverClassName
  )
  const wrapperHoverClass = clsx(
    scaling === 'transform' && styles.wrapperHoverTransform,
    scaling === 'fontSize' && styles.wrapperHoverFontSize
  )
  const classesWrapper = clsx(
    scaling === 'transform' && styles.wrapperTransform,
    scaling === 'fontSize' && styles.wrapperFontSize,
    styles.wrapper,
    (hovered || clicked) && wrapperHoverClass
  )

  const onClickHandler = useCallback(
    (e: React.MouseEvent) => {
      if (!multipleUse) {
        setClicked(true)
        cursorContext.toNormal()
      }
      onClick && onClick(e)
    },
    [cursorContext, multipleUse, onClick]
  )

  const onMouseEnterHandler = useCallback(() => {
    setHovered(true)
    cursorContext.showScroll(false)
    cursorContext.toDot()
  }, [cursorContext])

  const onMouseLeaveHandler = useCallback(() => {
    setHovered(false)
    cursorContext.showScroll(true)
    cursorContext.toNormal()
  }, [cursorContext])

  return (
    <button className={classesRoot}>
      <div
        className={clsx(styles.eventCatcher, biggerArea && styles.biggerArea)}
        onClick={onClickHandler}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      />
      <span className={classesWrapper}>{children}</span>
    </button>
  )
}
