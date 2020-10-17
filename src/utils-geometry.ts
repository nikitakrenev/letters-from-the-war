import * as PIXI from 'pixi.js'

type Point = { x: number; y: number }
type PointPolar = { r: number; t: number }

const toPolar = (point: Point): PointPolar => {
  const range = point.x > 0 ? 0 : Math.PI
  return {
    r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
    t: Math.atan(point.y / point.x) + range,
  }
}

const toCartesian = (point: PointPolar): Point => ({
  x: point.r * Math.cos(point.t),
  y: point.r * Math.sin(point.t),
})

export const translate = (
  source: Point,
  point: Point,
  dist: number
): PIXI.Point => {
  const pol = toPolar({ x: point.x - source.x, y: point.y - source.y })
  pol.r += dist
  const cart = toCartesian(pol)
  return new PIXI.Point(cart.x + source.x, cart.y + source.y)
}
