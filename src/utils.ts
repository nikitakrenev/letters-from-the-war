export const noop = () => {}

export const repeat = <T>(func: () => T, n: number): T[] =>
  Array.from(Array(n)).map(() => func())

export const times = (func: Function, n: number) => {
  for (let i = 0; i < n; i++) {
    func()
  }
}

export const stagger = (func: Function, n: number, t: number) => {
  for (let i = 0; i < n; i++) {
    setTimeout(func, i * t)
  }
}

export const rand = (n: number) => Math.random() * n

export const randSign = () => (Math.random() >= 0.5 ? 1 : -1)

export const randRange = (from: number, to: number) => rand(to - from) + from

export const randDeviate = (n: number) => rand(n * 2) - n

export const randElem = <T>(arr: T[]): T => arr[Math.floor(rand(arr.length))]

export const mapInterval = (
  in1Start: number,
  in1End: number,
  in2Start: number,
  in2End: number,
  value: number
) => ((value - in1Start) * (in2End - in2Start)) / (in1End - in1Start) + in2Start

export const partition = <T>(arr: T[], n: number): T[][] => {
  const res: T[][] = []
  for (let i = 0; i < arr.length; i += n) {
    res.push(arr.slice(i, i + n))
  }
  return res
}

export const inRect = (x: number, y: number, rect: DOMRect) =>
  x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom

export const debounce = (func: Function, wait: number) => {
  let waiting = false
  return (...args: any[]) => {
    if (!waiting) {
      func(...args)
      waiting = true
      window.setTimeout(() => (waiting = false), wait)
    }
  }
}
