import "./board.scss";
function Btn(isLast) {
  return (
    <button
      className={
        isLast
          ? "playboard__line__btn-container-play playboard__line__btn-container-play--last"
          : "playboard__line__btn-container-play "
      }
    ></button>
  );
}
export default Btn;
