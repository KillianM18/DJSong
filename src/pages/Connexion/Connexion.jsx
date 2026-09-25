import React from "react";
import { useState } from "react";
import "./Connexion.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MusicHoverButton from "../../components/MusicHoverButton/MusicHoverButton";
import Banner from "../../components/Banner/Banner";
import myFetch from "../../assets/utils/Fetch";

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await myFetch(
        "connexion",
        "POST",
        `email=${email}&password=${password}`,
      );
      // const json = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token)
        navigate("/playboard");
      } else {
        console.error("probleme");
      }
    } catch (err) {
      console.error(err);
    }
    // Handle form submission logic here
  };
  return (
    <div className="Connexion">
      <Banner />
      <div className="right">
        <h1>Connexion</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <MusicHoverButton type="submit" label="Se connecter" />
          </form>
        </div>
        <div className="signup-link">
          <p>
            Vous n'avez pas de compte?{" "}
            <Link to="/inscription" className="link">
              Inscrivez-vous ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
