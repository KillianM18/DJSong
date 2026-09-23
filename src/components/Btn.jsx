import { usePlayboard } from "../context/PlayboardContext";
import "./board.scss";

function Btn({ padIndex }) {
  const { pads, handlePadClick, isRecording } = usePlayboard();
  
  const sound = pads[padIndex];
  
  const handleClick = () => {
    handlePadClick(padIndex);
  };

  return (
    <button 
      className={`playboard__line__btn-container-play ${sound ? 'has-sound' : ''}`}
      onClick={handleClick}
      title={sound ? sound.name : 'Pad vide'}
    >
      {sound && <span className="pad-icon">🎵</span>}
    </button>
  );
}
export default Btn;
