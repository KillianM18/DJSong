import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Temp from "./pages/Temp/Temp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/temp" element={<Temp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
