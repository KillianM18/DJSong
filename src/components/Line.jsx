import Btn from "./Btn";
import "./board.scss";

function Line({ nb_col, isLast, isNewColumn }) {
  let line = [];
  for (let i = 0; i < nb_col; i++) {
    i == nb_col - 1
      ? isNewColumn
        ? line.push(<Btn isLast={true} />)
        : line.push(<Btn isLast={false} />)
      : line.push(<Btn isLast={false} />);
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
