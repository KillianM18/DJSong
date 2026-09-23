import { Link } from "react-router-dom";
import "./Header.scss";
import headerPlaceholder from "../../assets/images/logo_cropted.jpg";
import ProfileLogo from "../../assets/images/user.svg";

function Header() {
  return (
    <div className="header">
      <Link to="/playboard" className="header__profile">
        <img
          src={headerPlaceholder}
          alt="logo de DJSong"
          className="header__logo"
        />
      </Link>
      <Link to="/profile" className="header__profile">
        <img src={ProfileLogo} className="header__profileLogo" />
      </Link>
    </div>
  );
}

export default Header;
