import React, { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'
import { Button } from '../Button/Button'
import { SoundContext } from '../App/App'
import { TSoundButtonColor } from '../../types'
import styles from './SoundButton.module.css'

interface ISoundButtonProps {
  color: TSoundButtonColor
}

const pathsOn = [
  'M1 4V18',
  'M5 0V22',
  'M9 4V18',
  'M13 8V14',
  'M17 6V16',
  'M21 2V20',
  'M25 0V22',
  'M29 2V20',
  'M33 6V16',
  'M37 8V14',
]

const pathsOff = [
  'M1 8V14',
  'M5 8V14',
  'M9 8V14',
  'M13 8V14',
  'M17 8V14',
  'M21 8V14',
  'M25 8V14',
  'M29 8V14',
  'M33 8V14',
  'M37 8V14',
]

export const SoundButton = ({ color }: ISoundButtonProps) => {
  const soundContext = useContext(SoundContext)

  const [soundOn, setSoundOn] = useState(true)

  useEffect(() => {
    soundOn ? soundContext.enableSounds() : soundContext.disableSounds()
  }, [soundOn, soundContext])

  return (
    <Button
      biggerArea
      className={styles.root}
      onClick={() => setSoundOn(!soundOn)}
      multipleUse
    >
      <svg
        viewBox="0 0 38 22"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
          styles.svg,
          color === 'black' && styles.black,
          color === 'white' && styles.white
        )}
      >
        {(soundOn ? pathsOn : pathsOff).map((path, i) => (
          <path
            className={clsx(soundOn && styles.path)}
            style={{ animationDelay: `${i / 10}s` }}
            d={path}
            key={i}
          />
        ))}
      </svg>
    </Button>
  )
}
