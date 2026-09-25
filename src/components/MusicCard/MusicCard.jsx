import "./MusicCard.scss";
import { Link } from "react-router-dom";

function MusicCard({ name, isClickable = true }) {
  return (
    <div className={`musicCard ${!isClickable ? 'musicCard--non-clickable' : ''}`}>
      {isClickable ? (
        <Link to="/">
          {name}
        </Link>
      ) : (
        <span className="musicCard__name">{name}</span>
      )}
    </div>
  );
}

export default MusicCard;
