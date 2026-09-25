import React from "react";
import "./Inscription.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useState } from "react";
import MusicHoverButton from "../../components/MusicHoverButton/MusicHoverButton";
import Banner from "../../components/Banner/Banner";
import myFetch from "../../assets/utils/Fetch";

function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await myFetch(
      "inscription",
      "POST",
      `username=${username}&email=${email}&password=${password}`,
    );
    // const json = await res.json();

    if (res.ok) {
      // console.log(json);
      navigate("/playboard");
    } else {
      console.error(json);
    }
  };

  return (
    <div className="Inscription">
      <Banner />
      <div className="right">
        <h1>Inscription</h1>
        <p>Bienvenue sur notre page d'inscription!</p>
        <div className="form-container">
          <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email:</label>
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
            <MusicHoverButton type="submit" label="S'inscrire" />
          </form>
        </div>
        <div className="signup-link">
          <p>
            Vous avez déjà un compte?{" "}
            <Link to="/connexion" className="link">
              Connectez-vous ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inscription;
