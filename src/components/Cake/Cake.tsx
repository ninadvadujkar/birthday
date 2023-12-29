import { BlowState } from '../../hooks/detect-blowing/detect-blowing.hook';
import Candle from '../Candle/Candle';
import './Cake.scss';

interface Props {
  blowState: BlowState
}

const Cake = ({ blowState }: Props) => {
  const candles = [...(Array(20).keys())].slice(1).map(index => {
    return <Candle key={index} candleAdditionalClasses={[`candle${index}`]} blowState={blowState} />
  })
  return (
    <div className="cake">
      <div className="plate"></div>
      <div className="layer layer-bottom"></div>
      <div className="layer layer-middle"></div>
      <div className="layer layer-top"></div>
      <div className="icing"></div>
      <div className="drip drip1"></div>
      <div className="drip drip2"></div>
      <div className="drip drip3"></div>
      {candles}
    </div>
  );
};

export default Cake;
