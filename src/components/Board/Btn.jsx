import { usePlayboard } from "../../context/PlayboardContext";
import "./Board.scss";

function Btn({ tags, isLast, padIndex }) {
  const { pads, handlePadClick, padKeys } = usePlayboard();
  
  const sound = pads[padIndex];
  const assignedKey = padKeys[padIndex];
  
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
          {assignedKey && (
            <span className="pad-shortcut" style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', fontSize: '0.7rem', color: 'white' }}>
              {assignedKey}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

export default Btn;
