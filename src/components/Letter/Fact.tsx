import React from 'react'
import styles from './Fact.module.css'

interface IFactProps {
  paragraphs: string[]
  tipVisible: boolean
}

export const Fact = ({ paragraphs, tipVisible }: IFactProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Fact:</h1>

        {paragraphs.map((paragraph, i) => (
          <p className={styles.paragraph} key={i}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className={styles.tip} style={{ opacity: tipVisible ? 1 : 0 }}>
        <p>scroll</p>

        <svg
          className={styles.tipArrowSvg}
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 0.5L6 5.5L11 0.5" stroke="white" />
        </svg>
      </div>
    </div>
  )
}
