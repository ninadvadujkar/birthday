import { useCallback, useEffect, useRef } from 'react';
import { useAudioRecorder } from '../audio-recorder/audio-recorder.hook';

export enum BlowState {
  INITIAL = 'initial',
  BLOWING = 'blowing',
  BLOWN = 'blown'
}

const useDetectBlowing = () => {
  const { intiateRecorder, getAudioPeakLevel, blowState, setBlowState, hasMicrophonePermission } = useAudioRecorder();
  const intervalRef = useRef([0]);

  const start = useCallback(async () => {
    const { analyzer, array } = await intiateRecorder();
    setBlowState(BlowState.INITIAL);
    startMeasuringBlowing(analyzer, array);
  }, []);

  useEffect(() => {
    (async () => start())();
  }, [start]);

  const stop = useCallback(() => {
    for (let item of intervalRef.current) {
      clearInterval(item);
    }
    setTimeout(() => {
      setBlowState(BlowState.BLOWN);
    }, 500);
  }, [start]);

  const startMeasuringBlowing = useCallback((analyzer: AnalyserNode | null, array: Uint8Array | null) => {
    if (!analyzer || !array) {
      return;
    }

    intervalRef.current.push(setInterval(() => {
      const peak = getAudioPeakLevel(analyzer, array);
      const blowingSpeed = Math.round(peak * 100);
      if (blowingSpeed >= 80) {
        setBlowState(BlowState.BLOWING);
      }
    }));
  }, [getAudioPeakLevel]);

  const blowCandles = () => {
    setBlowState(BlowState.BLOWING);
  };

  return { start, stop, blowCandles, blowState, hasMicrophonePermission };
};

export {
  useDetectBlowing
};

