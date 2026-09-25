import React from 'react'
import { Link } from 'react-router-dom'
import './Home_connexion.scss'
import '../../components/Button/button.scss';
import MusicHoverButton from '../../components/MusicHoverButton/MusicHoverButton';
import Banner from '../../components/Banner/Banner';

function Home_connexion() {

  return (
	<div className="Home_connexion">
        <Banner />
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