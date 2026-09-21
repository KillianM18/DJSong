import MusicCard from "../../components/MusicCard/MusicCard";
import "./Profile.scss";

function Profile() {
  const data = {
    firstname: "Jeremy",
    lastname: "BYRDY--CHERON",
    createdMusics: ["tralala", "trululu", "trololo", "trilili"],
  };

  return (
    <div className="profile">
      <h1 className="profile__title">Profil</h1>
      <h2 className="profile__informations">
        {data.firstname} {data.lastname}
      </h2>
      <hr />
      <h3 className="profile__lastMusicsTitle">Derniers morceaux créés</h3>

      <div className="profile__musicsGrid">
        {data.createdMusics.map((music) => {
          return <MusicCard key={music} name={music} />;
        })}
      </div>
    </div>
  );
}
export default Profile;
