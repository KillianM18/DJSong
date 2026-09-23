import Btn from "./Btn";
import "./board.scss";

function Line({ nb_col, lineIndex }) {
  let line = [];
  for (let i = 0; i < nb_col; i++) {
    const padIndex = lineIndex * nb_col + i;
    line.push(<Btn key={i} padIndex={padIndex} />);
  }
  return <div className="playboard__line">{line}</div>;
}
export default Line;
