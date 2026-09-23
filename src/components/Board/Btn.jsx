import "./Board.scss";

function Btn({ tags }) {
  return (
    <button className={`playboard__line__btn-container-play ${tags}`}></button>
  );
}

export default Btn;
