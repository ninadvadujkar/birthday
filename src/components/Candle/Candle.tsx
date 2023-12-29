import { BlowState } from '../../hooks/detect-blowing/detect-blowing.hook';
import './Candle.scss';

interface Props {
  candleAdditionalClasses?: string[];
  flameAdditionalClasses?: string[];
  blowState?: BlowState;
}

const Candle = ({ candleAdditionalClasses = [], flameAdditionalClasses = [], blowState = BlowState.INITIAL }: Props) => {
  return (
    <div className={`candle ${candleAdditionalClasses.join(' ')}`}>
      <div className={`flame ${blowState} ${flameAdditionalClasses.join(' ')}`}></div>
    </div>
  );
};

export default Candle;
