import { Link } from "react-router-dom";
import "./Header.scss";
import headerPlaceholder from "../../assets/images/header-placeholder.png";
import ProfileLogo from "../../assets/images/user.svg";

function Header() {
  return (
    <div className="header">
      <img
        src={headerPlaceholder}
        alt="logo de DJSong"
        className="header__logo"
      />
      <Link to="/profile">
        <img src={ProfileLogo} className="header__profileLogo" />
      </Link>
    </div>
  );
}

export default Header;
