'use client'
import { flex, grid } from '../../styled-system/patterns'
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
    <div
      className={flex({
        direction: 'column',
        flex: '1 0 100%',
        color: 'white',
      })}
    >
      <div
        className={grid({
          flex: '1 0 100%',
          columns: 1,
          gridTemplateRows: 'auto',
          minHeight: '100%',
        })}
      >
        <div
          className={grid({
            columns: 1,
            gridTemplateRows: 'min-content',
            gap: '18px',
            margin: 'min(4vw, 60px) min(4vw, 60px) 0 min(4vw, 60px)',
            padding: 'min(4vw, 40px)',
            border: '4px solid white',
            borderRadius: 'min(7vw, 40px)',
          })}
        >
          <SpeechResult />
        </div>
      </div>
    </div>
  )
}
