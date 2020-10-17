import React, { useState, useContext } from 'react'
import { DevelopmentContext } from '../App/App'
import { LoadingScreen } from './LoadingScreen'
import { Screens } from '../Screens/Screens'
import { Smoke } from '../Smoke/Smoke'
import { Flicker } from '../Flicker/Flicker'
import { Dirt } from '../Dirt/Dirt'
import { TSoundButtonColor } from '../../types'
import { TPixiResources } from '../../assets'

interface IAssetLoaderProps {
  setSoundButtonColor: React.Dispatch<React.SetStateAction<TSoundButtonColor>>
}

export const PixiResourcesContext = React.createContext<TPixiResources>({})

export const AssetLoader = ({ setSoundButtonColor }: IAssetLoaderProps) => {
  const developmentContext = useContext(DevelopmentContext)

  const [pixiResources, setPixiResources] = useState<TPixiResources>({})

  const [loaded, setLoaded] = useState(false)

  return (
    <PixiResourcesContext.Provider value={pixiResources}>
      <>
        {loaded ? (
          <>
            <Screens setSoundButtonColor={setSoundButtonColor} />
            {!developmentContext.enabled && <Smoke />}
          </>
        ) : (
          <LoadingScreen
            setPixiResources={setPixiResources}
            setLoaded={setLoaded}
          />
        )}
        {!developmentContext.enabled && <Flicker />}
        {!developmentContext.enabled && <Dirt />}
      </>
    </PixiResourcesContext.Provider>
  )
}
