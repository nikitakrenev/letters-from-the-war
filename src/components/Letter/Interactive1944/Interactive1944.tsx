import React, { useRef, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { SoundContext } from '../../App/App'
import { useParallax } from '../../../hooks/useParallax'
import { imageAssetSources } from '../../../assets'
import styles from './Interactive1944.module.css'

const helmet1 = imageAssetSources.i1944Helmet1.png
const helmet2 = imageAssetSources.i1944Helmet2.png
const helmet3 = imageAssetSources.i1944Helmet3.png
const gun = imageAssetSources.i1944Gun.png

type TMouseHandlerEvent = React.MouseEvent<
  HTMLDivElement,
  globalThis.MouseEvent
>

export const Interactive1944 = () => {
  const soundContext = useContext(SoundContext)

  useEffect(() => soundContext.startLoop('battle'), [soundContext])

  const defaultOffset = '23%'
  const mouseOverOffset = '12%'

  const mouseOverHandler = (e: TMouseHandlerEvent) => {
    const target = e.currentTarget
    target.style.top = mouseOverOffset
  }

  const mouseOutHandler = (e: TMouseHandlerEvent) => {
    const target = e.currentTarget
    target.style.top = defaultOffset
  }

  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  useParallax([layer1Ref, layer2Ref, layer3Ref], [2.4, 1.8, 1.2])

  return (
    <div className={styles.root}>
      <div ref={layer3Ref} className={styles.imageLayer}>
        <div ref={layer3Ref} className={clsx(styles.image, styles.layer3)} />
      </div>

      <div ref={layer2Ref} className={styles.imageLayer}>
        <div className={styles.layer2}>
          {[helmet1, helmet2, helmet3].map((helmet, i) => (
            <div
              key={i}
              className={styles.helmetGroup}
              style={{ top: defaultOffset }}
              onMouseOver={mouseOverHandler}
              onMouseOut={mouseOutHandler}
            >
              <img src={gun} alt="" className={styles.gun} />
              <img
                src={helmet}
                alt=""
                className={clsx(
                  styles.helmet,
                  helmet === helmet3 && styles.helmet3
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={layer1Ref} className={styles.imageLayer}>
        <div className={styles.layer1} />
      </div>
    </div>
  )
}
