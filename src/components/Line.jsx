import Btn from "./Btn";
import "./board.scss";

function Line({ nb_col, isLast }) {
  let line = [];
  for (let i = 0; i < nb_col; i++) {
    line.push(<Btn />);
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
