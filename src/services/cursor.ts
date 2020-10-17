import gsap from 'gsap'

export class CursorService {
  private readonly canvas: HTMLCanvasElement
  private readonly context: CanvasRenderingContext2D | null

  private readonly size = 32
  private readonly half = this.size / 2
  private readonly lineWidth = 2
  private readonly sectorAngles: [number, number][] = [
    [5.0, 5.3],
    [5.9, 6.2],
    [2.0, 2.2],
    [2.4, 2.7],
    [3.0, 3.9],
  ]

  private timeline: gsap.core.Timeline
  private color = 'white'
  private state = { half: this.size / 2 }

  public scroll = false

  constructor() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.canvas.width = this.size
    this.canvas.height = this.size

    this.timeline = gsap.timeline({ paused: true })
    this.timeline.to(this.state, {
      half: 6,
      duration: 0.2,
      onUpdate: () => this.render(),
    })

    this.render()
  }

  toDot() {
    this.color = 'red'
    this.timeline.play()
  }

  toNormal() {
    this.color = 'white'
    this.timeline.reverse()
  }

  showScroll(state: boolean) {
    this.scroll = state
  }

  private drawCircle() {
    if (!this.context) {
      return
    }
    this.context.globalCompositeOperation = 'source-over'
    this.context.strokeStyle = this.color
    this.context.lineWidth = this.lineWidth
    this.context.beginPath()
    this.context.arc(
      this.half,
      this.half,
      this.state.half - this.lineWidth,
      0,
      Math.PI * 2
    )
    this.context.stroke()
    this.context.closePath()
  }

  private drawSector(startAngle: number, endAngle: number) {
    if (!this.context) {
      return
    }
    this.context.globalCompositeOperation = 'destination-out'
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.moveTo(this.half, this.half)
    this.context.arc(this.half, this.half, this.half, startAngle, endAngle)
    this.context.lineTo(this.half, this.half)
    this.context.fill()
    this.context.closePath()
  }

  private setCursor() {
    const data = this.canvas.toDataURL()
    this.scroll ? document.body.style.cursor = 'none' : document.body.style.cursor = `url(${data}) ${this.half} ${this.half}, auto`
  }

  private render() {
    this.context?.clearRect(0, 0, this.size, this.size)
    this.drawCircle()
    this.sectorAngles.forEach(([startAngle, endAngle]) =>
      this.drawSector(startAngle, endAngle)
    )
    this.setCursor()
  }
}
