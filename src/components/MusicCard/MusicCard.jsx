import "./MusicCard.scss";
import { Link } from "react-router-dom";

function MusicCard({ name }) {
  return (
    <div className="musicCard">
      <Link to="/">
        {name}
      </Link>
    </div>
  );
}

export default MusicCard;
