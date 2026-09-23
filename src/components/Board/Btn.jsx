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
      className={`playboard__line__btn-container-play ${sound ? 'has-sound' : ''} ${sound?.customTag ? sound.customTag : ''} ${tags ? tags : ""} ${isLast ? "playboard__line__btn-container-play--last" : ""}`}
    >
      {sound && (
        <div className="pad-content">
          <span className="pad-icon">🎵</span>
          <span className="pad-name">
            {sound.name.substring(0, 8)}{sound.name.length > 8 ? '..' : ''}
          </span>
        </div>
      )}
    </button>
  );
}

export default Btn;
