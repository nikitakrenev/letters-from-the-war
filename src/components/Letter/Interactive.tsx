import React from 'react'
import { Interactive1941 } from './Interactive1941/Interactive1941'
import { Interactive1942 } from './Interactive1942/Interactive1942'
import { Interactive1943 } from './Interactive1943/Interactive1943'
import { Interactive1944 } from './Interactive1944/Interactive1944'
import { Interactive1945 } from './Interactive1945/Interactive1945'
import { TYear } from '../../types'

interface IInteractiveProps {
  year: TYear
}

export const Interactive = ({ year }: IInteractiveProps) => {
  switch (year) {
    case 1941:
      return <Interactive1941 />
    case 1942:
      return <Interactive1942 />
    case 1943:
      return <Interactive1943 />
    case 1944:
      return <Interactive1944 />
    case 1945:
      return <Interactive1945 />
  }
}
