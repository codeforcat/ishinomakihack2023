import { createSpeechCommandsModel } from '../utils/speech'
import { Bar } from 'react-chartjs-2'
import { css } from '../../../styled-system/css'
import { flex } from '../../../styled-system/patterns'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any[] = []

export default function SearchResultsBlock() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleClick = async () => {
    try {
      setIsConnecting(true)
      const recognizer = await createSpeechCommandsModel()
      const classLabels = recognizer.wordLabels() // get class labels
      setIsConnecting(false)
      setIsListening(true)
      // listen() takes two arguments:
      // 1. A callback function that is invoked anytime a word is recognized.
      // 2. A configuration object with adjustable fields
      recognizer.listen(
        async (result) => {
          // render the probability scores per class
          classLabels.map(async (_, i) => {
            const score = result.scores[i]
            const roundedScore = Math.round((score as number) * 100)
            const now = Date.now()
            data.push({
              x: now,
              y: roundedScore,
            })
          })
        },
        {
          includeSpectrogram: true, // in case listen should return result.spectrogram
          probabilityThreshold: 0.75,
          invokeCallbackOnNoiseAndUnknown: true,
          overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
        }
      )
      // 暫定的に認識しっぱなしにするためにコメントアウト
      // setTimeout(() => {
      //   recognizer.stopListening()
      //   setIsListening(false)
      // }, 30000)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div
      className={flex({
        direction: 'column',
        align: 'center',
        maxHeight: '500px',
      })}
    >
      <div className={css({ paddingBottom: '40px' })}>
        <button
          type="button"
          className={flex({
            direction: 'column',
            align: 'center',
            justify: 'center',
            appearance: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            cursor: 'pointer',
            whiteSpace: 'pre-wrap',
            _disabled: {
              cursor: 'not-allowed',
              '& span': { backgroundColor: '#c9c9c9', color: 'white' },
            },
          })}
          onClick={handleClick}
        >
          <span
            className={flex({
              justify: 'center',
              align: 'center',
              fontFamily: 'Material Symbols Rounded Variable',
              fontSize: '24px',
              width: '50px',
              height: '50px',
              color: isConnecting ? 'white' : isListening ? 'white' : 'inherit',
              backgroundColor: isConnecting ? '#c9c9c9' : isListening ? '#ed0000' : '#faff7c',
              boxShadow: 'box',
              borderRadius: '50%',
              margin: '8px',
            })}
            aria-hidden="true"
          >
            {isConnecting ? 'hourglass_empty' : isListening ? 'graphic_eq' : 'mic'}
          </span>
          {isConnecting ? '接続中...' : isListening ? '音声検知中...' : '音声を検知する'}
        </button>
      </div>
      <Bar
        data={{
          datasets: [
            {
              data: [],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'くしゃみ',
            },
          },
          scales: {
            x: {
              type: 'realtime',
              grid: {
                lineWidth: 3,
              },
              realtime: {
                onRefresh: (chart) => {
                  const latestData = data[data.length - 1]
                  chart.data.datasets[0].data.push(latestData)
                  chart.update('quiet')
                },
              },
            },
            y: {
              grid: {
                lineWidth: 3,
              },
              suggestedMin: 0,
              suggestedMax: 100,
            },
          },
        }}
      />
    </div>
  )
}
