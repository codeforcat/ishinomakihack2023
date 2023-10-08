'use client'
import { css } from '../../styled-system/css'
import SpeechResult from './components/SpeechResult'

import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'
import StreamingPlugin from 'chartjs-plugin-streaming'
Chart.register(StreamingPlugin)

Chart.defaults.plugins.streaming = {
  duration: 20000, // データの表示期間を設定
  refresh: 500, // データの更新間隔を設定
  delay: 500, // 初回の更新までの遅延時間を設定
  pause: false, // ポーズボタンを表示しないように設定
  ttl: undefined, // データの有効期限を無期限に設定
  frameRate: 30, // フレームレートを設定
}

export default function Home() {
  return (
    <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
      <SpeechResult />
    </div>
  )
}
