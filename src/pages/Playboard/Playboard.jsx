import "./Playboard.scss";
import "../PlayboardParameters/PlayboardParam.scss";
import { Link } from "react-router-dom";
import Timeline from "../../components/Timeline/Timeline";
import ImportExportButton from "../../components/ImportExportButton/ImportExportButton";

import { useState } from "react";
import Board from "../../components/Board/Board";
import MusicHoverButton from "../../components/MusicHoverButton/MusicHoverButton";
import { usePlayboard } from "../../context/PlayboardContext";
import { Import, Keyboard, Square } from "lucide-react";

function Playboard() {
  const { nbr_line, setLine, nbr_col, setCol, stopAllSounds, isConfiguringKeys, setIsConfiguringKeys, keyConfigPopup, setKeyConfigPopup, pads, padKeys, setPadKeys, isAnyPadSoundPlaying } = usePlayboard();
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
        <button
          className={`main__userChoice__link ${isConfiguringKeys ? 'active-config' : ''}`}
          onClick={() => setIsConfiguringKeys(!isConfiguringKeys)}
          style={{ background: isConfiguringKeys ? '#ff4757' : '', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          title="Assigner des touches du clavier aux pads"
        >
          <Keyboard size={18} />
          {isConfiguringKeys ? 'Configuration...' : 'Raccourcis'}
        </button>

        <button
          className="main__userChoice__link"
          onClick={stopAllSounds}
          disabled={!isAnyPadSoundPlaying}
          style={{ 
            background: isAnyPadSoundPlaying ? '#ff4757' : 'rgba(255, 71, 87, 0.3)', 
            cursor: isAnyPadSoundPlaying ? 'pointer' : 'not-allowed',
            opacity: isAnyPadSoundPlaying ? 1 : 0.5,
            display: 'flex', alignItems: 'center', gap: '0.5rem' 
          }}
          title="Arrêter TOUS les sons"
        >
          <Square size={18} />
          Stop All
        </button>

        <MusicHoverButton
          label="Chercher un son"
          to="/playboard/parameters"
          className="main__userChoice__link"
        />
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

      {/* Pop-up pour assigner une touche (façon mini-board) */}
      {isConfiguringKeys && (
        <div className="pad-modal-overlay" onClick={() => { setIsConfiguringKeys(false); setKeyConfigPopup({ isOpen: false, padIndex: null }); }}>
          <div className="pad-modal-content" onClick={e => e.stopPropagation()}>
            <h2>Configurer les raccourcis clavier</h2>
            <p>
              {keyConfigPopup.padIndex !== null
                ? "Appuyez sur une touche de votre clavier..."
                : "Sélectionnez un pad pour lui attribuer une touche"}
            </p>

            {keyConfigPopup.padIndex !== null && (
              <input
                autoFocus
                onKeyDown={(e) => {
                  e.preventDefault();
                  setPadKeys(prev => ({ ...prev, [keyConfigPopup.padIndex]: e.key.toUpperCase() }));
                  setKeyConfigPopup({ isOpen: true, padIndex: null });
                }}
                onBlur={(e) => e.target.focus()}
                style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
              />
            )}

            <div
              className="pad-mini-board"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${nbr_col}, 1fr)`,
                gridTemplateRows: `repeat(${nbr_line}, 1fr)`,
                gap: '10px',
                margin: '20px auto',
                width: '100%',
                maxWidth: '300px',
                aspectRatio: `${nbr_col} / ${nbr_line}`
              }}
            >
              {Array(nbr_line * nbr_col).fill(null).map((_, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <button
                    className={`mini-pad ${pads[i] ? 'occupied' : 'empty'} ${pads[i]?.customTag ? pads[i].customTag : ''}`}
                    onClick={() => {
                      setKeyConfigPopup({ isOpen: true, padIndex: i });
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: keyConfigPopup.padIndex === i ? '3px solid #ff4757' : '1px solid rgba(255,255,255,0.1)'
                    }}
                    title={pads[i] ? pads[i].name : `Pad vide ${i + 1}`}
                  >
                    {padKeys[i] ? padKeys[i] : (pads[i] ? "🎵" : "+")}
                  </button>

                  {/* Bouton de suppression du raccourci */}
                  {padKeys[i] && (
                    <button
                      className="delete-pad-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPadKeys(prev => {
                          const newKeys = { ...prev };
                          delete newKeys[i];
                          return newKeys;
                        });
                      }}
                      title="Supprimer ce raccourci"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button className="cancel-btn" onClick={() => { setIsConfiguringKeys(false); setKeyConfigPopup({ isOpen: false, padIndex: null }); }}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Playboard;
