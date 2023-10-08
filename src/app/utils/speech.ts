import * as speechCommands from '@tensorflow-models/speech-commands'
import * as tf from '@tensorflow/tfjs';

const URL = "https://teachablemachine.withgoogle.com/models/SM3n2-sjx/";

export const createSpeechCommandsModel = async () => {
  tf.setBackend("webgl")

  const checkpointURL = URL + "model.json"; // model topology
  const metadataURL = URL + "metadata.json"; // model metadata

  const recognizer = speechCommands.create(
      "BROWSER_FFT", // fourier transform type, not useful to change
      undefined, // speech commands vocabulary feature, not useful for your models
      checkpointURL,
      metadataURL);

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();

  return recognizer;
};
