import React, { useState } from 'react'
import { AssetLoader } from '../AssetLoader/AssetLoader'
import { SoundButton } from '../SoundButton/SoundButton'
import { CursorService } from '../../services/cursor'
import { SoundService } from '../../services/sound'
import { TSoundButtonColor } from '../../types'
import styles from './App.module.css'

const cursorService = new CursorService()
export const CursorContext = React.createContext<CursorService>(cursorService)

const soundService = new SoundService()
export const SoundContext = React.createContext<SoundService>(soundService)

const dirtContextDefault = { enabled: true, setEnabled: (_: boolean) => {} }
export const DirtContext = React.createContext(dirtContextDefault)

const developmentContextDefault = { enabled: false }
export const DevelopmentContext = React.createContext(developmentContextDefault)

export const App = () => {
  const [soundButtonColor, setSoundButtonColor] = useState<TSoundButtonColor>(
    'white'
  )
  const [dirtEnabled, setDirtEnabled] = useState(true)

  return (
    <CursorContext.Provider value={cursorService}>
      <SoundContext.Provider value={soundService}>
        <DirtContext.Provider
          value={{ enabled: dirtEnabled, setEnabled: setDirtEnabled }}
        >
          <DevelopmentContext.Provider value={developmentContextDefault}>
            <div className={styles.root}>
              <AssetLoader setSoundButtonColor={setSoundButtonColor} />
              <SoundButton color={soundButtonColor} />
            </div>
          </DevelopmentContext.Provider>
        </DirtContext.Provider>
      </SoundContext.Provider>
    </CursorContext.Provider>
  )
}
