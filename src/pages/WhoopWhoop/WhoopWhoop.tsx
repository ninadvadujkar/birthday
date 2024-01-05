import './WhoopWhoop.scss';
import Cake from '../../components/Cake/Cake';
import { BlowState, useDetectBlowing } from '../../hooks/detect-blowing/detect-blowing.hook';
import { useConfetti } from '../../hooks/confetti/confetti.hook';
import { useContext, useEffect } from 'react';
import { UserNameContext } from '../../contexts/user-name.context';
import { useNavigate } from 'react-router-dom';
import Song from '../../components/Song/Song';

const WhoopWhoop = () => {
  const navigate = useNavigate();
  const { userName } = useContext(UserNameContext);
  const { blowState, hasMicrophonePermission, stop, start, blowCandles } = useDetectBlowing();
  const { isDone, initiateFireworks, setIsDone } = useConfetti();

  useEffect(() => {
    if (blowState === BlowState.BLOWING) {
      stop();
      initiateFireworks();
    }
  }, [blowState]);

  useEffect(() => {
    if (!userName) {
      navigate('/');
      return;
    }
  }, [userName]);

  const handleReset = async () => {
    await start();
    setIsDone(false);
  };

  const notInitialState = blowState !== BlowState.INITIAL;
  const isInitialState = blowState === BlowState.INITIAL;

  return (<>
    <div className="container">
      <div className="whoopwhoop-flex-container">
        <div className="heading-container">
          {<h1 className={`heading ${notInitialState ? 'visible': ''}`}>Happy Birthday {userName}! 🎉</h1>}
          {isInitialState && hasMicrophonePermission &&
            <>
              <div className="note">It's your birthday! Go ahead and blow the candles!</div>
              <div className="note" style={{ marginTop: '10px', fontStyle: 'italic' }}>If blowing into the microphone doesn't work, just shout! 😝</div>
            </>
          }
        </div>
        <div className="cake-container">
          <Cake blowState={blowState} />
        </div>
        <div className="button-container">
          {notInitialState && <div className="wish">Hope you have a great year filled with amazing moments! Onwards and upwards 🥳</div>}
          {isDone && <button type="button" className="btn btn-success btn-reset" onClick={handleReset}>I wanna do it again!</button>}
          {isInitialState && !hasMicrophonePermission &&
            <div className="note">Looks like you have not provided microphone permission yet.
              If you don't provide the permission, you cannot blow the candles, unfortunately.
              In that case you can use the button below to blow the candles.
            </div>
          }
          {isInitialState && !hasMicrophonePermission &&
            <button type="button" className="btn btn-success btn-reset" onClick={blowCandles}>Blow candles!</button>
          }
        </div>
      </div>
      {notInitialState && <Song />}
    </div>
  </>);
};

export default WhoopWhoop;
