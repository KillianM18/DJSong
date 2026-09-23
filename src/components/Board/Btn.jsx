import "./Board.scss";

function Btn({ tags, isLast }) {
  return (
    <button 
      className={`playboard__line__btn-container-play ${tags ? tags : ""} ${isLast ? "playboard__line__btn-container-play--last" : ""}`}
    ></button>
  );
}

export default Btn;
