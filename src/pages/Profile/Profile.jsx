import MusicCard from "../../components/MusicCard/MusicCard";
import MusicHoverButton from "../../components/MusicHoverButton/MusicHoverButton";
import ProfileLogo from "../../assets/images/user.svg";
import "./Profile.scss";

import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  
  const data = {
    pseudo: "Jeremy",
    createdMusics: ["tralala", "trululu", "trololo", "trilili"],
    abonnement: {
      name: "or",
      price: "9,99€/mois",
    }
  };

  const handleLogout = () => {
    // Plus tard : ajouter la suppression du token d'authentification
    navigate("/home_connexion");
  };

  return (
    <div className="profile">
      <div className="profile__header-actions">
        <MusicHoverButton to="/subscription" label="Abonnement" />
        <button className="profile__logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
      <div className="profile__header">
        <img src={ProfileLogo} alt="profil" className="profile__profileLogo" />
        <h1 className="profile__title">{data.pseudo} <img src={`src/assets/images/logo_${data.abonnement.name}.webp`} alt={data.abonnement.name} /></h1>
      </div>
      <h2 className="profile__lastMusicsTitle">Derniers morceaux créés</h2>
      <div className="profile__musicsGrid">
        {data.createdMusics.map((music) => {
          return <MusicCard key={music} name={music} isClickable={false} />;
        })}
      </div>
    </div>
  );
}
export default Profile;
