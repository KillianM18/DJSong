import Btn from "./Btn";
import "./board.scss";

function Line({ nb_col }) {
  let line = [];
  for (let i = 0; i < nb_col; i++) {
    line.push(<Btn />);
  }
  return <div className="playboard__line">{line}</div>;
}
export default Line;
