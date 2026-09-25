import MusicCard from "../../components/MusicCard/MusicCard";
import MusicHoverButton from "../../components/MusicHoverButton/MusicHoverButton";
import ProfileLogo from "../../assets/images/user.svg";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import myFetch from "../../assets/utils/Fetch";
import { useState } from "react";
import { useEffect } from "react";

function Profile() {
  const navigate = useNavigate();
  
  const data = {
    createdMusics: [
      { name: "Neon Reverie", duration: "4:18" },
      { name: "Synth City", duration: "3:45" },
      { name: "Digital Pulse", duration: "5:12" },
      { name: "Electric Echo", duration: "4:01" }
    ],
    memberSince: "Janvier 2026"
  };
  const [pseudo, setPseudo] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await myFetch("profile", "GET");
        const json = await res.json();

        if (res.ok) {
          setPseudo(json.username);
          setSubscription(json.subscription); // { name, price }
        } else {
          console.error(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Chargement...</p>;


  const getProjectLimit = (plan) => {
    switch (plan) {
      case 'argent': return 5;
      case 'or': return 10;
      case 'platine': return 20;
      case 'diamant': return 'Illimité';
      default: return 2; // gratuit
    }
  };

  const handleLogout = () => {
    navigate("/home_connexion");
  };

  const limit = getProjectLimit(subscription?.name || "free");

  return (
    <div className="profile">
      
      {/* Carte de Profil Principale */}
      <div className="profile__card">
        
        <div className="profile__card-top">
          <div className="profile__avatar-wrapper">
            <img src={ProfileLogo} alt="profil" className="profile__avatar" />
          </div>
          
          <div className="profile__info">
            <div className="profile__name-row">
              <h1 className="profile__name">{pseudo}</h1>
              <div className={`profile__badge profile__badge--${subscription?.name || "free"}`}>
                <img src={`src/assets/images/logo_${subscription?.name || "free"}.webp`} alt={subscription?.name || "free"} />
                <span>{subscription?.name || "free"}</span>
              </div>
            </div>
            
            <div className="profile__member-since">Membre depuis {data.memberSince}</div>

            <div className="profile__stats">
              <div className="profile__stat">
                <span className="profile__stat-label">Projets réalisés</span>
                <span className="profile__stat-value">{data.createdMusics.length} <span className="profile__stat-limit">/ {limit}</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile__actions">
          <MusicHoverButton 
            to="/subscription" 
            label="Abonnement" 
            className="profile__btn profile__btn--sub" 
          />
          <button className="profile__btn profile__btn--logout" onClick={handleLogout}>
            <LogOut size={20} /> Déconnexion
          </button>
        </div>

      </div>

      {/* Section des morceaux */}
      <div className="profile__tracks-section">
        <h2 className="profile__section-title">Derniers morceaux créés</h2>
        <div className="profile__tracks-grid">
          {data.createdMusics.map((music, index) => {
            return <MusicCard key={index} name={music.name} duration={music.duration} isClickable={false} />;
          })}
        </div>
      </div>

    </div>
  );
}
export default Profile;
