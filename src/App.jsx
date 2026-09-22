import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Connexion from './pages/Connexion/Connexion.jsx';
import Home_connexion from './pages/Home_connexion/Home_connexion.jsx';
import Inscription from './pages/Inscription/Inscription.jsx';
import Profile from "./pages/Profile/Profile";
import FloatingLines from './components/FloatingLines/FloatingLines';
import "./App.css";


function App() {

  return (
    <div className="app">
      <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <FloatingLines
          linesGradient={["#1265ec", "#A2EBF0", "#DB3069"]}
          animationSpeed={2}
          enabledWaves={["middle", "bottom", "top"]}
          lineCount={5}
          lineDistance={41.5}
          interactive={false}
          bendRadius={17}
          bendStrength={-3}
        />
      </div>
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
