import React from 'react'
import { Link } from 'react-router-dom'
import './Home_connexion.scss'
import '../../components/Button/button.scss';
import MusicHoverButton from '../../components/MusicHoverButton/MusicHoverButton';

function Home_connexion() {

  return (
	<div className="Home_connexion">
        <div className="left">
            <div className="logo">
                <img src="https://cdn.discordapp.com/attachments/1129050911681876042/1130591558829824060/logo.png" alt="Logo" />
            </div>
        </div>
        <div className="right">
            <h1>Bienvenue sur DJSong</h1>
            <div className="button-container">
                <MusicHoverButton to="/connexion" label="Connexion" />
                <MusicHoverButton to="/playboard" label="Invite" />
            </div>
        </div>
        
	</div>
	);
}

export default Home_connexion