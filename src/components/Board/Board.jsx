import Line from "./Line";
import "./Board.scss";

function Board({ nb_col, nb_line }) {
  let board = [];
  for (let i = 0; i < nb_line; i++) {
    board.push(<Line nb_col={nb_col} key={i} />);
  }
  return <div className="playboard">{board}</div>;
}
export default Board;
