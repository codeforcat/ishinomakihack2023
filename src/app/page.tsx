'use client'
import { css } from '../../styled-system/css'
import SpeechResult from './components/SpeechResult'

export default function Home() {
  return (
    <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
      <SpeechResult />
    </div>
  )
}
