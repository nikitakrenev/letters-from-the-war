import * as PIXI from 'pixi.js'
import {
  pixiAssetNames,
  pixiAssetSources,
  TPixiResources,
  imageAssetNames,
  imageAssetSources,
  fontAssetNames,
  fontAssetSources,
} from './assets'
import { partition } from './utils'
import { Mutable } from './types'

const pixiLoader = new PIXI.Loader()

export const loadPixiAssets = (
  onLoaded: (loader: PIXI.Loader, resources: TPixiResources) => void
) => {
  pixiAssetNames.forEach((imageName) =>
    pixiLoader.add(imageName, pixiAssetSources[imageName])
  )
  pixiLoader.load(onLoaded)
}

export const loadImageAssets = (onLoaded: () => void) => {
  const partitionSize = 10

  const partitions = partition(
    imageAssetNames as Mutable<typeof imageAssetNames>,
    partitionSize
  )

  const loadPartition = (partitionIndex: number, webpSupport: boolean) => {
    if (partitionIndex > partitions.length - 1) {
      onLoaded()
      return
    }
    const images = partitions[partitionIndex]
    let loaded = 0
    images.forEach((imageName) => {
      const img = new Image()
      img.onload = () => {
        loaded += 1
        if (loaded === partitions[partitionIndex].length) {
          loadPartition(partitionIndex + 1, webpSupport)
        }
      }
      const { webp, png } = imageAssetSources[imageName]
      if (webpSupport && webp) {
        img.src = webp
      } else {
        img.src = png
      }
    })
  }

  Modernizr.on('webp', (result) => {
    loadPartition(0, result)
  })
}

export const loadFontAssets = (onLoaded: () => void) => {
  const promises: Promise<FontFace>[] = []
  fontAssetNames.forEach((fontName) => {
    const fontFace = new FontFace(fontName, fontAssetSources[fontName])
    document.fonts.add(fontFace)
    promises.push(fontFace.load())
  })
  Promise.all(promises).then(onLoaded)
}
