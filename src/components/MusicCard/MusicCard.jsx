import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import "./MusicCard.scss";

function MusicCard({ name, duration, isClickable = true }) {
  const content = (
    <>
      <div className="musicCard__icon-wrapper">
        <Play className="musicCard__icon" size={24} fill="currentColor" />
      </div>
      <div className="musicCard__info">
        <span className="musicCard__name">{name}</span>
        {duration && <span className="musicCard__duration">{duration}</span>}
      </div>
      <div className="musicCard__waveform">
        {/* Fake waveform decorative */}
        <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
      </div>
    </>
  );

  return (
    <div className={`musicCard ${!isClickable ? 'musicCard--non-clickable' : ''}`}>
      {isClickable ? (
        <Link to="/" className="musicCard__link">
          {content}
        </Link>
      ) : (
        <div className="musicCard__content">
          {content}
        </div>
      )}
    </div>
  );
}

export default MusicCard;
