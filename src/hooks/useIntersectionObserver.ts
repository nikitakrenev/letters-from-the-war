import { useState, useEffect } from 'react'

type hookState = {
  inView: boolean
  triggered: boolean
  entry?: IntersectionObserver
}

export const useIntersectionObserver = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  { threshold, root, rootMargin }: IntersectionObserverInit
): [boolean, IntersectionObserver?] => {
  const [state, setState] = useState<hookState>({
    inView: false,
    triggered: false,
    entry: undefined,
  })

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      if (entries[0].intersectionRatio > 0) {
        setState({
          inView: true,
          triggered: true,
          entry: observerInstance,
        })
        ref.current && observerInstance.unobserve(ref.current)
      }
      return
    },
    {
      threshold: threshold || 0,
      root: root || null,
      rootMargin: rootMargin || '0%',
    }
  )

  useEffect(() => {
    if (ref.current && !state.triggered) {
      observer.observe(ref.current)
    }
  })

  return [state.inView, state.entry]
}
