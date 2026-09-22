import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Connexion from './pages/Connexion/Connexion.jsx';
import Home_connexion from './pages/Home_connexion/Home_connexion.jsx';
import Inscription from './pages/Inscription/Inscription.jsx';
import Profile from "./pages/Profile/Profile";
import Playboard from "./pages/Playboard/Playboard";
import PlayboardParam from "./pages/PlayboardParameters/PlayboardParam.jsx";
import "./App.scss";


function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/connexion" replace />} />
          <Route
            path="/connexion"
            element={
              <Connexion />
            }
          />

          <Route
            path="/home_connexion"
            element={
              <Home_connexion />
            }
          />
          <Route
            path="/inscription"
            element={
              <Inscription />
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/playboard" element={<Playboard />} />
          <Route path="/playboard/parameters" element={<PlayboardParam />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
