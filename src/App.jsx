// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playboard from "./pages/Playboard/Playboard";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/playboard" element={<Playboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
