import "./Playboard.scss";
import Board from "../../components/Board/Board";
import { Link } from "react-router-dom";
import Timeline from "../../components/Timeline/Timeline";
import ImportExportButton from "../../components/ImportExportButton/ImportExportButton";

import { useState } from "react";
import { usePlayboard } from "../../context/PlayboardContext";
import { Import } from "lucide-react";

function Playboard() {
  const { nbr_line, setLine, nbr_col, setCol } = usePlayboard();
  const [isNewLine, setIsNewLine] = useState(false);
  const [isNewColumn, setIsNewColumn] = useState(false);
  if (nbr_line > 6 || nbr_col > 6) {
    if (nbr_line > 6) {
      setLine(6);
    }
    if (nbr_col > 6) {
      setCol(6);
    }
    return alert("Vous êtes limités à 6 par lignes et colonnes.");
  }
  if (nbr_line < 1 || nbr_col < 1) {
    if (nbr_line < 1) {
      setLine(1);
    }
    if (nbr_col < 1) {
      setCol(1);
    }
    return alert(
      "Vous ne pouvez pas avoir moins d'une colonne ou d'une ligne.",
    );
  }

  return (
    <div className="main">

      <div className="main__userChoice">
        <span>Lignes :</span>
        <button
          onClick={() => {
            setLine(nbr_line - 1);
            setIsNewLine(false);
          }}
          className="main__userChoice__btn"
        >
          -
        </button>
        <span>{nbr_line}</span>
        <button
          onClick={() => {
            setLine(nbr_line + 1);
            setIsNewLine(true);
          }}
          className="main__userChoice__btn"
        >
          +
        </button>

        <span>Colonnes :</span>
        <button
          onClick={() => {
            setCol(nbr_col - 1);
            setIsNewColumn(false);
          }}
          className="main__userChoice__btn"
        >
          -
        </button>
        <span>{nbr_col}</span>
        <button
          onClick={() => {
            setCol(nbr_col + 1);
            setIsNewColumn(true);
          }}
          className="main__userChoice__btn"
        >
          +
        </button>
        <Link to="/playboard/parameters" className="main__userChoice__link">Chercher un son</Link>
      </div>
      <Board
        nb_col={nbr_col}
        nb_line={nbr_line}
        isNewLine={isNewLine}
        isNewColumn={isNewColumn}
      />

      {/*Intégration de la Timeline*/}
      <Timeline />
      <ImportExportButton />
    </div>
  );
}
export default Playboard;
