import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { rand, times, debounce, randSign } from '../utils'
import { TPixiResources } from '../assets'

export const fireworkClickDebounce = 1700

export class FireworksService {
  private readonly canvas: HTMLCanvasElement
  private width: number
  private height: number

  private fireworkScale: number
  private fireworkDeviation: number
  private fireworkMinDeviation: number
  private fireworkMinYSpawn: number
  private particlesPerFirework = 100
  private smokePerFirework = 13

  private readonly app: PIXI.Application

  private readonly particleSpriteSource: PIXI.Texture | undefined
  private readonly smokeSpriteSource: PIXI.Texture | undefined

  private readonly resizeListener: () => void

  constructor(resources: TPixiResources, canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const canvasRect = canvas.getBoundingClientRect()
    this.width = canvasRect.width
    this.height = canvasRect.height

    this.fireworkScale = this.width * 0.11
    this.fireworkDeviation = this.width * 0.03
    this.fireworkMinDeviation = this.width * 0.01
    this.fireworkMinYSpawn = this.width * 0.035

    this.app = new PIXI.Application({
      view: this.canvas,
      width: this.width,
      height: this.height,
      transparent: true,
      autoStart: true,
      antialias: true,
    })
    this.app.stage.interactive = true
    this.app.stage.hitArea = new PIXI.Rectangle(0, 0, this.width, this.height)
    this.app.stage.addListener(
      'pointerdown',
      debounce(this.onClick.bind(this), fireworkClickDebounce)
    )

    this.particleSpriteSource = resources['fireworksParticle']?.texture
    this.smokeSpriteSource = resources['fireworksSmoke']?.texture

    this.resizeListener = this.resize.bind(this)
    window.addEventListener('resize', this.resizeListener)
    this.resize()
  }

  private resize() {
    const canvasRect = this.canvas.getBoundingClientRect()
    this.width = canvasRect.width
    this.height = canvasRect.height
    this.app.renderer.resize(this.width, this.height)
    this.app.stage.hitArea = new PIXI.Rectangle(0, 0, this.width, this.height)
  }

  private createNewParticle(point: PIXI.Point) {
    const velocity = rand(3)
    const gravity = 0.02
    const friction = 0.98
    const radian = rand(Math.PI * 2)
    const rate = rand(1) + 0.3
    let vX = velocity * Math.cos(radian) * rate
    let vY = velocity * Math.sin(radian) * rate
    const sprite1 = new PIXI.Sprite(this.particleSpriteSource)
    const sprite2 = new PIXI.Sprite(this.particleSpriteSource)
    const sprite3 = new PIXI.Sprite(this.particleSpriteSource)
    const sprite4 = new PIXI.Sprite(this.particleSpriteSource)
    ;[sprite1, sprite2, sprite3, sprite4].forEach((sprite) => {
      sprite.anchor.set(0.5)
      sprite.x = point.x
      sprite.y = point.y
      this.app.stage.addChild(sprite)
    })
    const animObj = { x: 0, y: 0, alpha: 1 }
    gsap.to(animObj, {
      x: `+=100`,
      y: `+=100`,
      alpha: 0,
      modifiers: {
        x: () => {
          sprite4.x = sprite3.x
          sprite3.x = sprite2.x
          sprite2.x = sprite1.x
          sprite1.x += vX
          vX *= friction
        },
        y: () => {
          sprite4.y = sprite3.y
          sprite3.y = sprite2.y
          sprite2.y = sprite1.y
          sprite1.y += vY
          vY += gravity
          vY *= friction
        },
        alpha: (alpha) => {
          sprite4.alpha = sprite3.alpha
          sprite3.alpha = sprite2.alpha
          sprite2.alpha = sprite1.alpha
          sprite1.alpha = alpha

          sprite4.scale = sprite3.scale
          sprite3.scale = sprite2.scale
          sprite2.scale = new PIXI.Point(sprite1.alpha, sprite1.alpha)
        },
      },
      ease: 'power2.out',
      duration: rand(2) + 2,
      onComplete: () => {
        sprite1.parent.removeChild(sprite1)
        sprite2.parent.removeChild(sprite2)
        sprite3.parent.removeChild(sprite3)
        sprite4.parent.removeChild(sprite4)
      },
    })
  }

  private createSmoke(point: PIXI.Point) {
    const distance = rand(this.fireworkScale) + this.fireworkScale / 2
    const half = distance / 2
    let vX = rand(0.004) - 0.002
    let vY = rand(0.004) - 0.002
    const sprite = new PIXI.Sprite(this.smokeSpriteSource)
    sprite.anchor.set(0.5)
    sprite.x = point.x
    sprite.y = point.y
    const scaleTarget = rand(0.5) + 0.5
    sprite.scale = new PIXI.Point(0, 0)
    sprite.alpha = 0.4
    sprite.angle = rand(360)
    sprite.blendMode = PIXI.BLEND_MODES.DARKEN
    this.app.stage.addChild(sprite)
    const timeline = gsap.timeline()
    timeline.to(sprite, {
      x: `+=${rand(distance) - half}`,
      y: `+=${rand(distance) - half}`,
      angle: '+=1',
      modifiers: {
        x: (x) => (x += vX),
        y: (y) => (y += vY),
      },
      alpha: 0,
      ease: 'power2.out',
      duration: rand(4) + 2,
      onComplete: () => sprite.parent.removeChild(sprite),
    })
    timeline.to(sprite.scale, { x: scaleTarget, y: scaleTarget }, 0)
  }

  private createFirework(point: PIXI.Point) {
    const spawnPoint: PIXI.Point = new PIXI.Point(
      point.x +
        (rand(this.fireworkDeviation) + this.fireworkMinDeviation) * randSign(),
      // Max makes sure that firework is not drawn too close to canvas edge
      Math.max(
        point.y +
          (rand(this.fireworkDeviation) + this.fireworkMinDeviation) *
            randSign(),
        this.fireworkMinYSpawn
      )
    )
    times(() => this.createSmoke(spawnPoint), this.smokePerFirework)
    times(() => this.createNewParticle(spawnPoint), this.particlesPerFirework)
  }

  private onClick(e: PIXI.interaction.InteractionEvent) {
    this.createFirework(e.data.global)
    setTimeout(() => this.createFirework(e.data.global), 150)
    setTimeout(() => this.createFirework(e.data.global), 300)
  }

  stopService() {
    window.removeEventListener('resize', this.resizeListener)
  }
}
