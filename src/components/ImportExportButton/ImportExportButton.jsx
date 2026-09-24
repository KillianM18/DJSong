import React, { useState, useRef } from "react";
import { Download, Upload } from "lucide-react";
import { usePlayboard } from "../../context/PlayboardContext";
import "./ImportExportButton.scss";

function ImportExportButton() {
  const [fileName, setfileName] = useState("mon_projet");
  const fileInputRef = useRef(null);
  const { pads, events, nbr_line, nbr_col, timelineDuration, loadProject } = usePlayboard();

  const jsonFileDownload = () => {
    const json_data = {
      pads,
      events,
      nbr_line,
      nbr_col,
      timelineDuration
    };
    
    // Si l'utilisateur n'a pas mis de nom, on force un nom par défaut
    const finalName = fileName.trim() === "" ? "mon_projet" : fileName;
    const all_Name = `${finalName}.json`;
    
    const data = new Blob([JSON.stringify(json_data, null, 2)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", all_Name);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const jsonFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (window.confirm("Attention, importer un projet va écraser votre travail actuel. Voulez-vous continuer ?")) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          loadProject(data);
          // Reset de l'input pour pouvoir ré-importer le même fichier si besoin
          fileInputRef.current.value = "";
        } catch (error) {
          alert("Erreur lors de la lecture du fichier JSON. Il est peut-être corrompu.");
        }
      };
    } else {
      // Annulation, on reset l'input
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="import-export-container">
      <div className="import-export-card">
        <h3>Sauvegarde Locale</h3>
        <p className="import-export-desc">Sauvegardez ou restaurez votre composition sur votre ordinateur.</p>
        
        <div className="import-export-actions">
          <div className="export-section">
            <input 
              className="export-input"
              value={fileName} 
              onChange={(e) => setfileName(e.target.value)} 
              placeholder="Nom du fichier"
            />
            <button className="btn-action btn-export" onClick={jsonFileDownload}>
              <Download size={18} />
              Exporter
            </button>
          </div>

          <div className="divider"></div>

          <div className="import-section">
            <input 
              type="file" 
              accept=".json"
              ref={fileInputRef}
              onChange={jsonFileUpload} 
              style={{ display: 'none' }}
            />
            <button className="btn-action btn-import" onClick={handleUploadClick}>
              <Upload size={18} />
              Importer un projet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportExportButton;