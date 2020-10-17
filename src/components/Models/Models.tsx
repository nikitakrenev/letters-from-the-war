import React, { useRef, useEffect, Suspense, useState, useContext } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useFrame, extend } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader'
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader'
import clsx from 'clsx'
import { DevelopmentContext } from '../App/App'
import { Fade } from '../Fade/Fade'
import { TYear } from '../../types'
import { Medalion } from './Medalion'
import { Bread } from './Bread'
import { Key } from './Key'
import { Letter } from './Letter'
import { Chocolate } from './Chocolate'
import { useFade } from '../../hooks/useFade'
import { useNormalizedMouse } from '../../hooks/useNormalizedMouse'
import { jitter } from '../../animations/jitter'
import { rotateToMouse } from '../../animations/rotate'
import styles from './Models.module.css'
extend({ EffectComposer, RenderPass, FilmPass, ShaderPass })

interface IEffectsProps {
  biggerBlur: boolean
}

const Effects = ({ biggerBlur }: IEffectsProps) => {
  const composer = useRef<EffectComposer | null>(null)
  const { scene, gl, size, camera } = useThree()

  useEffect(() => void composer.current?.setSize(size.width, size.height), [
    size,
  ])

  useFrame(() => composer.current?.render(), 1)

  const blurBase = biggerBlur ? 4 : 2

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <shaderPass
        attachArray="passes"
        args={[VerticalBlurShader]}
        uniforms-v-value={[blurBase / size.width / 2]}
      />
      <shaderPass
        attachArray="passes"
        args={[HorizontalBlurShader]}
        uniforms-h-value={blurBase / size.height / 2}
      />
      <filmPass attachArray="passes" args={[0.95, 0, 0, true]} renderToScreen />
    </effectComposer>
  )
}

interface IModelsMouseWrapper {
  visibleYear: TYear | null
}

const ModelsMouseWrapper: React.FC<IModelsMouseWrapper> = ({ visibleYear }) => {
  const normalizedMouse = useNormalizedMouse()

  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return jitter(groupRef.current.position)
    }
  }, [])

  useEffect(() => {
    if (groupRef.current) {
      return rotateToMouse(groupRef.current.rotation, normalizedMouse)
    }
  }, [normalizedMouse])

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        {visibleYear === 1941 ? (
          <Medalion />
        ) : visibleYear === 1942 ? (
          <Bread />
        ) : visibleYear === 1943 ? (
          <Key />
        ) : visibleYear === 1944 ? (
          <Letter />
        ) : visibleYear === 1945 ? (
          <Chocolate />
        ) : null}
      </Suspense>
    </group>
  )
}

interface IModelsProps {
  selectedYear: TYear | null
  hoveredYear: TYear | null
  visible: boolean
}

export const Models = ({
  selectedYear,
  hoveredYear,
  visible,
}: IModelsProps) => {
  const developmentContext = useContext(DevelopmentContext)

  const [visibleYear, setVisibleYear] = useState(selectedYear || hoveredYear)

  const fadeRef = useRef<HTMLDivElement>(null)

  const { fadeIn, fadeOut } = useFade([fadeRef], {
    distance: 30,
    duration: 0.3,
    autoStartFadeIn: true,
  })

  useEffect(() => {
    if (visible) {
      fadeIn()
    } else {
      const tween = fadeOut()
      return () => {
        tween.kill()
      }
    }
  }, [fadeIn, fadeOut, visible])

  useEffect(() => {
    const tween = fadeOut(() => {
      setVisibleYear(selectedYear || hoveredYear)
      fadeIn()
    })
    return () => {
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeIn, fadeOut, hoveredYear])

  return (
    <div className={clsx(styles.root, !visible && styles.hidden)}>
      <Fade ref={fadeRef} inheritCss>
        <Canvas camera={{ position: [0, 0, 5] }} invalidateFrameloop={!visible}>
          <directionalLight position={[-2, 2, 3]} />
          <ambientLight intensity={1.2} />
          <ModelsMouseWrapper visibleYear={visibleYear} />
          {!developmentContext.enabled && (
            <Effects biggerBlur={selectedYear !== null} />
          )}
        </Canvas>
      </Fade>
    </div>
  )
}
