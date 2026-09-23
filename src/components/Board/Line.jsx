import Btn from "./Btn";
import "./Board.scss";

function Line({ nb_col, isLast, isNewColumn, lineIndex }) {
  let line = [];
  for (let i = 0; i < nb_col; i++) {
    const padIndex = lineIndex * nb_col + i;
    line.push(<Btn key={i} padIndex={padIndex} isLast={i === nb_col - 1 ? isNewColumn : false} />);
  }

  return (
    <div
      className={
        isLast ? "playboard__lastLine playboard__line" : "playboard__line"
      }
    >
      {line}
    </div>
  );
}
export default Line;
