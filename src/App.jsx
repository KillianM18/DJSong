import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connexion from './pages/Connexion/Connexion.jsx';
import Home_connexion from './pages/Home_connexion/Home_connexion.jsx';
import Inscription from './pages/Inscription/Inscription.jsx';
import './App.css';


function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/connexion"
            element={
              <Connexion/>
            }
          />
          
          <Route
              path="/home_connexion"
              element={
                <Home_connexion/>
              }
            />
          <Route
              path="/inscription"
              element={
                <Inscription/>
              }
            />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
