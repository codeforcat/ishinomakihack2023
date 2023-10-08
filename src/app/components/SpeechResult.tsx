import { useState } from 'react'
import { createSpeechCommandsModel } from "../utils/speech";

export default function SearchResultsBlock() {
  const [recognitionResult, setRecognitionResult] = useState(0)

  const handleClick = async () => {
    try {
      const recognizer = await createSpeechCommandsModel();
      const classLabels = recognizer.wordLabels(); // get class labels

      // listen() takes two arguments:
      // 1. A callback function that is invoked anytime a word is recognized.
      // 2. A configuration object with adjustable fields
      return recognizer.listen(async result => {
          // render the probability scores per class
          classLabels.map(async (label, i) => {
            const score = result.scores[i];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setRecognitionResult(score as any);
          });
      }, {
          includeSpectrogram: true, // in case listen should return result.spectrogram
          probabilityThreshold: 0.75,
          invokeCallbackOnNoiseAndUnknown: true,
          overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
      });
    } catch (e) {
      console.error(e);
      setRecognitionResult(0);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>音声取り込み</button>
      <pre>{recognitionResult}</pre>
    </div>
  )
}
