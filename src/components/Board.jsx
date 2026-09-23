import Line from "./Line";
import "./board.scss";

function Board({ nb_col, nb_line, isNewLine, isNewColumn }) {
  let board = [];
  for (let i = 0; i < nb_line; i++) {
    i == nb_line - 1
      ? isNewLine
        ? board.push(
            <Line nb_col={nb_col} isLast={true} isNewColumn={isNewColumn} />,
          )
        : board.push(
            <Line nb_col={nb_col} isLast={false} isNewColumn={isNewColumn} />,
          )
      : board.push(
          <Line nb_col={nb_col} isLast={false} isNewColumn={isNewColumn} />,
        );
  }
  return <div className="playboard">{board}</div>;
}
export default Board;
