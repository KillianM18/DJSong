import Btn from "./Btn";
import "./Board.scss";

function Line({ nb_col }) {
  let line = [];
  for (let i = 0; i < nb_col; i++) {
    line.push(<Btn key={i} />);
  }
  return <div className="playboard__line">{line}</div>;
}
export default Line;
