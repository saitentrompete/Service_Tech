/**
 * Converts a Blob object to a base64 encoded string.
 * @param {Blob} blob The Blob object to convert.
 * @returns {Promise<string>} A promise that resolves with the base64 encoded string.
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error("Failed to convert blob to base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Decodes a base64 encoded string into a Uint8Array.
 * @param {string} base64 The base64 encoded string to decode.
 * @returns {Uint8Array} The decoded Uint8Array.
 */
export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Decodes audio data from a Uint8Array into an AudioBuffer.
 * @param {Uint8Array} data The audio data to decode.
 * @param {AudioContext} ctx The AudioContext to use for decoding.
 * @param {number} sampleRate The sample rate of the audio data.
 * @param {number} numChannels The number of channels in the audio data.
 * @returns {Promise<AudioBuffer>} A promise that resolves with the decoded AudioBuffer.
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
