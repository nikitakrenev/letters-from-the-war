import React, { useRef, useContext } from 'react'
import { useOverlay } from '../../hooks/useOverlay'
import { imageAssetSources } from '../../assets'
import { DirtContext } from '../App/App'

const style: React.CSSProperties = {
  visibility: 'hidden',
  mixBlendMode: 'screen',
}

export const Dirt = () => {
  const dirtContext = useContext(DirtContext)

  const webpRef = useRef<HTMLSourceElement>(null)
  const pngRef = useRef<HTMLImageElement>(null)

  useOverlay([webpRef, pngRef], {
    frames: 40,
    width: 8,
    height: 5,
    duration: 2.5,
  })

  return (
    <picture style={{ display: dirtContext.enabled ? 'inline' : 'none' }}>
      <source
        ref={webpRef}
        srcSet={imageAssetSources.dirtOverlay.webp}
        type="image/webp"
        style={style}
      />
      <img
        ref={pngRef}
        src={imageAssetSources.dirtOverlay.png}
        alt=""
        style={style}
      />
    </picture>
  )
}
