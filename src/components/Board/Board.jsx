import Line from "./Line";
import "./Board.scss";

function Board({ nb_col, nb_line, isNewLine, isNewColumn }) {
  let board = [];
  for (let i = 0; i < nb_line; i++) {
    board.push(
      <Line
        key={i}
        lineIndex={i}
        nb_col={nb_col}
        isLast={i === nb_line - 1 ? isNewLine : false}
        isNewColumn={isNewColumn}
      />
    );
  }
  return <div className="playboard">{board}</div>;
}
export default Board;
