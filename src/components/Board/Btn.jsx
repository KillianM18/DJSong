import { usePlayboard } from "../../context/PlayboardContext";
import "./Board.scss";

function Btn({ tags, isLast, padIndex }) {
  const { pads, handlePadClick } = usePlayboard();
  
  const sound = pads[padIndex];
  
  const handleClick = () => {
    handlePadClick(padIndex);
  };

  return (
    <button 
      onClick={handleClick}
      title={sound ? sound.name : 'Pad vide'}
      className={`playboard__line__btn-container-play ${sound ? 'has-sound' : ''} ${tags ? tags : ""} ${isLast ? "playboard__line__btn-container-play--last" : ""}`}
    >
      {sound && <span className="pad-icon">🎵</span>}
    </button>
  );
}

export default Btn;
