import MusicCard from "../../components/MusicCard/MusicCard";
import ProfileLogo from "../../assets/images/user.svg";
import "./Profile.scss";

function Profile() {
  const data = {
    pseudo: "Jeremy",
    createdMusics: ["tralala", "trululu", "trololo", "trilili"],
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <img src={ProfileLogo} alt="profil" className="profile__profileLogo" />
        <h1 className="profile__title">{data.pseudo}</h1>
      </div>
      <h2 className="profile__lastMusicsTitle">Derniers morceaux créés</h2>
      <div className="profile__musicsGrid">
        {data.createdMusics.map((music) => {
          return <MusicCard key={music} name={music} />;
        })}
      </div>
    </div>
  );
}
export default Profile;
