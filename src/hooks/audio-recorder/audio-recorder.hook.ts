import { useCallback, useState } from "react";
import { BlowState } from '../detect-blowing/detect-blowing.hook';

const useAudioRecorder = () => {
  const [blowState, setBlowState] = useState(BlowState.INITIAL);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);

  const createAudioAnalyzer = useCallback((stream: MediaStream): AnalyserNode => {
    // Create an audio context and connect the stream source to an analyzer node
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyzer = context.createAnalyser();
    source.connect(analyzer);
    return analyzer;
  }, []);

  const getAudioPeakLevel = useCallback((analyzer: AnalyserNode, array: Uint8Array) => {
    analyzer.getByteTimeDomainData(array);
    return array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) / 128;
  }, []);

  const intiateRecorder = useCallback(async () => {
    try {
      // let us initiate the recorder here
      if (!navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported by browser!');
      }
  
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      // Create an audio context and connect the stream source to an analyzer node
      const analyzer = createAudioAnalyzer(stream);
      // The array we will put sound wave data in
      const array = new Uint8Array(analyzer.fftSize);
  
      setHasMicrophonePermission(true);
      return { analyzer, array };
    } catch (error) {
      setHasMicrophonePermission(false);
      console.error('No microphone permission provided');
      return { analyzer: null, array: null };
    }
  }, [createAudioAnalyzer]);

  return { intiateRecorder, getAudioPeakLevel, blowState, setBlowState, hasMicrophonePermission };
};

export {
  useAudioRecorder
};
