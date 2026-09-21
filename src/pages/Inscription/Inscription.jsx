import React from 'react';
import './Inscription.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
        <div className="left">
            <div className="logo">
                <img src="https://cdn.discordapp.com/attachments/1129050911681876042/1130591558829824060/logo.png" alt="Logo" />
            </div>
        </div>
        <div className="right">
            <h1>Inscription</h1>
            <p>Bienvenue sur notre page d'inscription!</p>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Nom d'utilisateur:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
      </div>
    </div>
  )
}

export default Inscription