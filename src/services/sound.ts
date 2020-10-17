import { Howl, Howler } from 'howler'
import { TSoundAssetName, soundAssetNames, soundAssetSources } from '../assets'
import { randElem, noop } from '../utils'

export class SoundService {
  private readonly howls: Record<string, Howl> = {}
  private readonly normalVolume = 0.5
  private readonly lowVolume = 0.07
  private soundEnabled = true

  private currentLoops: Record<string, boolean> = {}

  constructor() {
    Howler.volume(this.normalVolume)
    soundAssetNames.forEach((assetName) => {
      const asset = soundAssetSources[assetName]
      const howl = new Howl({ src: [asset.url], loop: asset.loop })
      this.howls[assetName] = howl
    })

    document.addEventListener('visibilitychange', () =>
      Howler.volume(
        document.visibilityState !== 'hidden' && this.soundEnabled
          ? this.normalVolume
          : 0
      )
    )
  }

  enableSounds() {
    this.soundEnabled = true
    Howler.volume(this.normalVolume)
  }

  disableSounds() {
    this.soundEnabled = false
    Howler.volume(0)
  }

  play(name: TSoundAssetName) {
    this.howls[name]?.play()
  }

  playRandom(names: TSoundAssetName[]) {
    this.play(randElem(names))
  }

  fadeIn(name: TSoundAssetName) {
    const howl = this.howls[name]
    howl.play()
    howl.fade(0, this.normalVolume, 5000)
    return () => this.fadeOut(name)
  }

  fadeOut(name: TSoundAssetName) {
    const howl = this.howls[name]
    howl.once('fade', (id) => howl.stop(id))
    howl.fade(howl.volume(), 0, 2000)
  }

  startLoop(name: TSoundAssetName) {
    if (this.currentLoops[name]) {
      return noop
    }
    this.currentLoops[name] = true
    return this.fadeIn(name)
  }

  stopLoop(name: TSoundAssetName) {
    if (!this.currentLoops[name]) {
      return
    }
    this.currentLoops[name] = false
    this.fadeOut(name)
  }

  lowerLoopVolume(name: TSoundAssetName) {
    const howl = this.howls[name]
    howl.fade(howl.volume(), this.lowVolume, 2000)
  }

  normalLoopVolume(name: TSoundAssetName) {
    const howl = this.howls[name]
    howl.fade(howl.volume(), this.normalVolume, 2000)
  }
}
