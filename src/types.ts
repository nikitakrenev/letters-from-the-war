// == Types ==

export type Vector2 = { x: number; y: number }

export type TAppScreens = 'intro' | 'selection' | 'outro'

export const years = [1941, 1942, 1943, 1944, 1945] as const
export type TYear = typeof years[number]

export type TSoundButtonColor = 'white' | 'black'

// == Utility types ==

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

// == Type guards ==

export const notNull = <T>(ref: T | null): ref is T => {
  return ref !== null
}
