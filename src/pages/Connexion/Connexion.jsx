import React from 'react';
import { useState } from 'react';
import './Connexion.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MusicHoverButton from '../../components/MusicHoverButton/MusicHoverButton';

function Connexion() {
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
    <div className="Connexion">
        <div className="left">
            <div className="logo">
                <img src="https://cdn.discordapp.com/attachments/1129050911681876042/1130591558829824060/logo.png" alt="Logo" />
            </div>
        </div>
        <div className="right">
            <h1>Connexion</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} method="POST">
                    <label htmlFor="email">Email ou nom d'utilisateur:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <MusicHoverButton type="submit" label="Se connecter" />
                    
                </form>
            </div>
            <div className="signup-link">
                <p>Vous n'avez pas de compte? <Link to="/inscription" className="link">Inscrivez-vous ici</Link></p>
            </div>
        </div>
    </div>
  )
};

export default Connexion;