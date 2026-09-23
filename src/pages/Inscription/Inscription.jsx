import React from 'react';
import './Inscription.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MusicHoverButton from '../../components/MusicHoverButton/MusicHoverButton';
import Banner from '../../components/Banner/Banner';

function Inscription() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
        // Handle form submission logic here
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
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <MusicHoverButton type="submit" label="S'inscrire" />
                </form>
            </div>
      </div>
    </div>
  )
}

export default Inscription