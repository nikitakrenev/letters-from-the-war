import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { TPixiResources } from '../assets'
import { debounce, rand, stagger, randDeviate, randRange } from '../utils'
import { translate } from '../utils-geometry'

const airClickDebounce = 1000

export class AirService {
  private readonly canvas: HTMLCanvasElement
  private width: number
  private height: number

  private readonly app: PIXI.Application

  private readonly bulletSpriteSource: PIXI.Texture | undefined
  private readonly plane1SpriteSource: PIXI.Texture | undefined
  private readonly plane2SpriteSource: PIXI.Texture | undefined

  plane1Shot = true
  plane2Shot = true

  private plane1: PIXI.Sprite
  private plane2: PIXI.Sprite

  private plane1SpawnerTimeout = 0
  private plane2SpawnerTimeout = 0

  private readonly planeContainer: PIXI.Container
  private readonly bulletContainer: PIXI.Container

  /** Ratio of bullet width to renderer width */
  private readonly bulletSizeXCoef = 0.005
  /** Bullet sprite aspect ratio */
  private readonly bulletAspectRatio = 3.5
  /** Bullet animation duration */
  private readonly bulletDuration = 0.8
  /** Bullet accuracy coefficient (to renderer width) */
  private readonly bulletDeviationXCoef = 0.01
  /** Number of bullets in a single burst */
  private readonly bulletCount = 20
  /** Time between shots */
  private readonly bulletStagger = 40
  /** Bullet travel distance coefficient (to renderer height) */
  private readonly bulletFlyDistanceYCoef = 1

  /** Highest plane altitude coefficient (to renderer height) */
  private readonly planeMinAltitudeYCoef = 0.3
  /** Lowest plane altitude coefficient (to renderer height) */
  private readonly planeMaxAltitudeYCoef = 0.5
  /** Max altitude change coefficient (to renderer height) */
  private readonly planeDeviationYCoef = 0.3
  /** Plane animation duration */
  private readonly planeFlyingDuration = 6
  /** Plane falling animation duration */
  private readonly planeShotDownDuration = 5
  /** Min interval between spawning planes */
  private readonly planeMinInterval = 8 * 1000

  /** Ratio of plane 1 width to renderer width */
  private readonly plane1SizeXCoef = 0.03
  /** Plane 1 sprite aspect ration */
  private readonly plane1AspectRatio = 2.46
  /** Max interval between spawning plane 1 */
  private readonly plane1MaxInterval = 10 * 1000

  /** Ratio of plane 2 width to renderer width */
  private readonly plane2SizeXCoef = 0.04
  /** Plane 2 sprite aspect ration */
  private readonly plane2AspectRatio = 1.49
  /** Max interval between spawning plane 2 */
  private readonly plane2MaxInterval = 13 * 1000

  private readonly resizeListener: () => void

  /** Increments evenry tick */
  private tickerInc = 0
  /** Run collision detection on every nth frame */
  private readonly tickerTrigger = 5

  constructor(resources: TPixiResources, canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const canvasRect = canvas.getBoundingClientRect()
    this.width = canvasRect.width
    this.height = canvasRect.height

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
      debounce(this.onClick.bind(this), airClickDebounce)
    )
    this.app.ticker.add(this.onTick.bind(this))

    this.bulletSpriteSource = resources['airBullet']?.texture
    this.plane1SpriteSource = resources['airPlane1']?.texture
    this.plane2SpriteSource = resources['airPlane2']?.texture

    this.plane1 = new PIXI.Sprite()
    this.plane2 = new PIXI.Sprite()

    this.planeContainer = new PIXI.Container()
    this.bulletContainer = new PIXI.Container()
    this.app.stage.addChild(this.planeContainer, this.bulletContainer)

    this.resizeListener = this.resize.bind(this)
    window.addEventListener('resize', this.resizeListener)
    this.resize()

    setTimeout(() => this.spawnPlane1(), rand(this.planeMinInterval))
    setTimeout(() => this.spawnPlane2(), rand(this.planeMinInterval))
  }

  private resize() {
    const canvasRect = this.canvas.getBoundingClientRect()
    this.width = canvasRect.width
    this.height = canvasRect.height
    this.app.renderer.resize(this.width, this.height)
    this.app.stage.hitArea = new PIXI.Rectangle(0, 0, this.width, this.height)
  }

  private onClick(e: PIXI.interaction.InteractionEvent) {
    const from: PIXI.Point = new PIXI.Point(rand(this.width), this.height)
    stagger(
      () =>
        this.spawnBullet(
          from,
          new PIXI.Point(
            e.data.global.x +
              randDeviate(this.width * this.bulletDeviationXCoef),
            e.data.global.y
          )
        ),
      this.bulletCount,
      this.bulletStagger
    )
  }

  private onTick() {
    this.tickerInc += 1
    if (this.tickerInc % this.tickerTrigger !== 0) {
      return
    }
    const bullets = this.bulletContainer.children
    for (let i = 0; i < bullets.length; i++) {
      const bulletBounds = bullets[i].getBounds()
      if (
        !this.plane1Shot &&
        this.collisionTest(bulletBounds, this.plane1.getBounds())
      ) {
        this.shootDownPlane1()
      }
      if (
        !this.plane2Shot &&
        this.collisionTest(bulletBounds, this.plane2.getBounds())
      ) {
        this.shootDownPlane2()
      }
    }
  }

  private collisionTest(a: PIXI.Rectangle, b: PIXI.Rectangle): boolean {
    return (
      a.x + b.width > b.x &&
      a.x < b.x + b.width &&
      a.y + a.height > b.y &&
      a.y < b.y + b.height
    )
  }

  private spawnBullet(from: PIXI.Point, to: PIXI.Point) {
    const angle = Math.atan2(to.y - from.y, to.x - from.x)
    const target = translate(
      from,
      to,
      this.height * this.bulletFlyDistanceYCoef
    )
    const bullet = new PIXI.Sprite(this.bulletSpriteSource)
    bullet.width = this.width * this.bulletSizeXCoef * this.bulletAspectRatio
    bullet.height = this.width * this.bulletSizeXCoef
    bullet.x = from.x
    bullet.y = from.y
    bullet.anchor.set(0.5)
    bullet.rotation = angle
    this.bulletContainer.addChild(bullet)
    gsap.to(bullet, {
      x: target.x,
      y: target.y,
      ease: 'none',
      duration: this.bulletDuration,
      onComplete: () => bullet.parent.removeChild(bullet),
    })
  }

  /** Plane 1 flies from right to left */
  private spawnPlane1() {
    this.plane1Shot = false
    const plane = new PIXI.Sprite(this.plane1SpriteSource)
    this.plane1 = plane
    plane.width = this.width * this.plane1SizeXCoef * this.plane1AspectRatio
    plane.height = this.width * this.plane1SizeXCoef
    plane.x = this.width + plane.width / 2
    plane.y = randRange(
      this.height * this.planeMinAltitudeYCoef,
      this.height * this.planeMaxAltitudeYCoef
    )
    plane.anchor.set(0.5)
    this.planeContainer.addChild(plane)
    gsap.to(plane, {
      x: 0 - plane.width,
      // Move plane higher
      y: plane.y - rand(this.height * this.planeDeviationYCoef),
      ease: 'none',
      duration: this.planeFlyingDuration,
      onComplete: () => {
        plane.parent.removeChild(plane)
        this.schedulePlane1Spawn()
      },
    })
  }

  /** PLane 2 flies from left to right */
  private spawnPlane2() {
    this.plane2Shot = false
    const plane = new PIXI.Sprite(this.plane2SpriteSource)
    this.plane2 = plane
    plane.width = this.width * this.plane2SizeXCoef * this.plane2AspectRatio
    plane.height = this.width * this.plane2SizeXCoef
    plane.x = 0 - plane.width / 2
    plane.y = randRange(
      this.height * this.planeMinAltitudeYCoef,
      this.height * this.planeMaxAltitudeYCoef
    )
    plane.anchor.set(0.5)
    this.planeContainer.addChild(plane)
    gsap.to(plane, {
      x: this.width + plane.width,
      // Move plane higher or lower
      y: plane.y + randDeviate(this.height * this.planeDeviationYCoef),
      ease: 'none',
      duration: this.planeFlyingDuration,
      onComplete: () => {
        plane.parent.removeChild(plane)
        this.schedulePlane2Spawn()
      },
    })
  }

  private shootDownPlane1() {
    this.plane1Shot = true
    const plane = this.plane1
    gsap.killTweensOf(plane)
    gsap.to(plane, { angle: -45, duration: this.planeShotDownDuration / 4 })
    gsap.to(plane, {
      x: plane.x - this.width / 2,
      y: plane.y + this.height,
      ease: 'none',
      duration: this.planeShotDownDuration,
      onComplete: () => {
        plane.parent.removeChild(plane)
        this.schedulePlane1Spawn()
      },
    })
  }

  private shootDownPlane2() {
    this.plane2Shot = true
    const plane = this.plane2
    gsap.killTweensOf(plane)
    gsap.to(plane, { angle: 45, duration: this.planeShotDownDuration / 4 })
    gsap.to(plane, {
      x: plane.x + this.width / 2,
      y: plane.y + this.height,
      ease: 'none',
      duration: this.planeShotDownDuration,
      onComplete: () => {
        plane.parent.removeChild(plane)
        this.schedulePlane2Spawn()
      },
    })
  }

  private schedulePlane1Spawn() {
    this.plane1SpawnerTimeout = window.setTimeout(
      () => this.spawnPlane1(),
      randRange(this.planeMinInterval, this.plane1MaxInterval)
    )
  }

  private schedulePlane2Spawn() {
    this.plane2SpawnerTimeout = window.setTimeout(
      () => this.spawnPlane2(),
      randRange(this.planeMinInterval, this.plane2MaxInterval)
    )
  }

  stopService() {
    window.removeEventListener('resize', this.resizeListener)
    window.clearTimeout(this.plane1SpawnerTimeout)
    window.clearTimeout(this.plane2SpawnerTimeout)
  }
}
