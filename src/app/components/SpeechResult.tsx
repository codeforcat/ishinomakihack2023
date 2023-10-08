import { createSpeechCommandsModel } from '../utils/speech'
import { Bar } from 'react-chartjs-2'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any[] = []

export default function SearchResultsBlock() {
  const handleClick = async () => {
    try {
      const recognizer = await createSpeechCommandsModel()
      const classLabels = recognizer.wordLabels() // get class labels

      // listen() takes two arguments:
      // 1. A callback function that is invoked anytime a word is recognized.
      // 2. A configuration object with adjustable fields
      return recognizer.listen(
        async (result) => {
          // render the probability scores per class
          classLabels.map(async (_, i) => {
            const score = result.scores[i]
            const roundedScore = Math.round((score as number) * 100)
            // console.log(`score: ${roundedScore}`)
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
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>音声取り込み</button>
      <Bar
        data={{
          datasets: [
            {
              label: '# of Votes',
              data: [],
              borderColor: 'pink',
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Chart.js Bar Chart',
            },
          },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                onRefresh: (chart) => {
                  const latestData = data[data.length - 1]
                  chart.data.datasets[0].data.push(latestData);
                  chart.update('quiet')
                },
              },
            },
            y: {
              suggestedMin: 0,
              suggestedMax: 100,
            }
          },
        }}
      />
    </div>
  )
}
