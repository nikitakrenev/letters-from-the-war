import React, { useRef, useContext } from 'react'
import gsap from 'gsap'
import { ReactComponent as Logo } from './logo.svg'
import { DirtContext } from '../App/App'
import { CornerButton } from '../CornerButton/CornerButton'
import { Link } from '../Link/Link'
import { Button } from '../Button/Button'
import { Fade } from '../Fade/Fade'
import { useFade } from '../../hooks/useFade'
import { useParallax } from '../../hooks/useParallax'
import { smokeService } from '../Smoke/Smoke'
import { TAppScreens } from '../../types'
import styles from './Outro.module.css'

interface IOutroProps {
  setScreen: (screen: TAppScreens) => void
}

export const Outro = ({ setScreen }: IOutroProps) => {
  const dirtContext = useContext(DirtContext)

  const fadeRef = useRef<HTMLDivElement>(null)

  const { fadeOut } = useFade([fadeRef], {
    distance: 30,
    duration: { fadeIn: 0.01, fadeOut: 1 },
    stagger: 0.5,
    autoStartFadeIn: true,
  })

  const blackOverlayRef = useRef<HTMLDivElement>(null)

  const goBack = () => {
    gsap.to(blackOverlayRef.current, { opacity: 1, duration: 1 })
    smokeService?.startAnimation()
    dirtContext.setEnabled(true)
    fadeOut(() => setScreen('intro'))
  }

  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)

  useParallax([layer1Ref, layer2Ref], [2.4, 1.2], true)

  return (
    <div className={styles.root}>
      <Fade ref={fadeRef} className={styles.fade} inheritCss>
        <CornerButton className={styles.corner} onClick={goBack} />

        <div ref={layer2Ref} className={styles.layer2}>
          <div className={styles.backgroundYears}>1941-1945</div>
        </div>

        <div ref={layer1Ref} className={styles.layer1}>
          <div className={styles.thanks}>
            <p className={styles.thanks1}>
              thank you for your feat
              <br />
              and clear sky
            </p>
            <p className={styles.thanks2}>75 years</p>
            <p className={styles.thanks3}>of the great victory</p>
          </div>
        </div>

        <div className={styles.share}>
          <p>Share this site with</p>
          <Button className={styles.shareLink} scaling="fontSize" multipleUse>
            Facebook
          </Button>
          <Button className={styles.shareLink} scaling="fontSize" multipleUse>
            Twitter
          </Button>
          <Button className={styles.shareLink} scaling="fontSize" multipleUse>
            Instagram
          </Button>
        </div>

        <Button
          className={styles.logo}
          onClick={() => window.open('https://omega-r.com', '_blank')}
          multipleUse
        >
          <Logo className={styles.logoSvg} />
        </Button>

        <div className={styles.sources}>
          <p>Источники</p>
          <Link href="http://pismasfronta.ru" className={styles.link} />
          <Link href="http://bigwar.msk.ru" className={styles.link} />
        </div>
      </Fade>

      <div ref={blackOverlayRef} className={styles.blackOverlay} />
    </div>
  )
}
