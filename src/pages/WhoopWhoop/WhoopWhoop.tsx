import './WhoopWhoop.scss';
import Cake from '../../components/Cake/Cake';
import { BlowState, useDetectBlowing } from '../../hooks/detect-blowing/detect-blowing.hook';
import { useConfetti } from '../../hooks/confetti/confetti.hook';
import { useContext, useEffect } from 'react';
import { UserNameContext } from '../../contexts/user-name.context';
import { useNavigate } from 'react-router-dom';

const WhoopWhoop = () => {
  const navigate = useNavigate();
  const { userName } = useContext(UserNameContext);
  const { blowState, stop, start } = useDetectBlowing();
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

  return (<>
    <h1 className="heading">Happy Birthday {userName}!</h1>
    <div className="note">It's your birthday! Go ahead and blow the candles!</div>
    <Cake blowState={blowState} />
    <div className="button-container">
      {isDone && <button type="button" className="btn btn-success btn-reset" onClick={handleReset}>Reset</button>}
    </div>
  </>);
};

export default WhoopWhoop;
