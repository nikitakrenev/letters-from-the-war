import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { repeat, rand, randElem } from '../utils'
import { TPixiResources } from '../assets'

export class SmokeService {
  private readonly renderer: PIXI.Renderer

  private readonly particleCount = 50
  private readonly spawnStagger = 0.1
  private readonly particles: PIXI.Sprite[] = []

  private readonly lightSprite: PIXI.Sprite

  /** Ratio between screen size and renderer size */
  private readonly rendererSizeRatio = 0.2
  /** Ratio between renderer size and particle size */
  private readonly particleSizeRatio = 0.35
  /** Ration between renderer size and light sprite size */
  private readonly lightSizeRatio = 0.4

  private rafId = 0
  private resizeListener: () => void
  private mouseMoveListener: (e: MouseEvent) => void
  animationEnabled = false

  constructor(imageAssets: TPixiResources, canvas: HTMLCanvasElement) {
    this.renderer = PIXI.autoDetectRenderer({
      view: canvas,
      transparent: true,
    })
    const stage = new PIXI.Container()
    const container = new PIXI.ParticleContainer(this.particleCount, {
      position: true,
      rotation: true,
      uvs: false,
      //@ts-ignore
      alpha: true,
    })
    stage.addChild(container)

    const textures = [
      imageAssets['smoke1'],
      imageAssets['smoke2'],
      imageAssets['smoke3'],
      imageAssets['smoke4'],
    ].map((image) => image?.texture)

    this.particles = repeat(() => {
      const sprite = new PIXI.Sprite(randElem(textures))
      sprite.anchor.set(0.5)
      sprite.x = 0
      container.addChild(sprite)
      return sprite
    }, this.particleCount)

    this.lightSprite = new PIXI.Sprite(imageAssets['smokeLight']?.texture)
    this.lightSprite.anchor.set(0.5)
    this.lightSprite.blendMode = PIXI.BLEND_MODES.SRC_ATOP
    stage.addChild(this.lightSprite)

    this.mouseMoveListener = this.mouseMove.bind(this)
    window.addEventListener('mousemove', this.mouseMoveListener)

    this.resizeListener = this.resize.bind(this)
    window.addEventListener('resize', this.resizeListener)
    this.resize()

    const render = () => {
      this.renderer.render(stage)
      this.rafId = requestAnimationFrame(render)
    }
    render()
  }

  private mouseMove(e: MouseEvent) {
    gsap.killTweensOf(this.lightSprite)
    gsap.to(this.lightSprite, {
      x: (e.clientX / window.innerWidth) * this.renderer.width,
      y: (e.clientY / window.innerHeight) * this.renderer.height,
      duration: 1.4,
    })
  }

  private resize() {
    this.renderer.resize(
      window.innerWidth * this.rendererSizeRatio,
      window.innerHeight * this.rendererSizeRatio
    )
    this.particles.forEach((particle) => {
      particle.width = this.renderer.width * this.particleSizeRatio
      particle.height = particle.width
    })
    this.lightSprite.width = this.renderer.width * this.lightSizeRatio
    this.lightSprite.height = this.lightSprite.width
  }

  private animateParticle(particle: PIXI.Sprite, delay: number) {
    if (!this.animationEnabled) {
      return
    }
    gsap.killTweensOf(particle)
    const width = this.renderer.width
    const height = this.renderer.height
    gsap.fromTo(
      particle,
      {
        x: rand(width) - width * 0.07,
        y: height + height * 0.4,
        rotation: rand(Math.PI * 2),
        alpha: 0.6,
      },
      {
        x: `+=${rand(width * 0.2)}`,
        y: height * 0.6 - rand(height * 0.1),
        rotation: `+=${rand(Math.PI / 2)}`,
        alpha: 0,
        duration: rand(5) + 3,
        delay,
        onComplete: this.animateParticle.bind(this),
        onCompleteParams: [particle, 0],
      }
    )
  }

  startAnimation() {
    if (this.animationEnabled) {
      return
    }
    this.animationEnabled = true
    this.particles.forEach((particle, i) => {
      this.animateParticle(particle, this.spawnStagger * i)
    })
  }

  stopAnimation() {
    this.animationEnabled = false
  }

  stopService() {
    cancelAnimationFrame(this.rafId)
    window.removeEventListener('resize', this.resizeListener)
    window.removeEventListener('mousemove', this.mouseMoveListener)
  }
}
