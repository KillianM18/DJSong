import React from "react";
import { useState } from "react";

import "./ImportExportButton.scss";

function ImportExportButton() {
  const [fileName, setfileName] = useState("");
  const jsonFileDownload = () => {
    const json_data = {
      //timeline
    };
    const all_Name = `${fileName}.json`;
    const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", all_Name);
    link.click();
    document.body.removeChild(link);
  };

  const jsonFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      const data = JSON.parse(e.target.result);
      console.log("Json Data", data);
    };
  };
  return (
    <div className="import-export-button">
      <div className="download">
        <h2>Download</h2>
        <input value={fileName} onChange={(e) => setfileName(e.target.value)} />
        <button onClick={jsonFileDownload}>Download JSON File</button>
      </div>

      <hr />

      <div className="upload">
        <h2>Upload</h2>
        <input type="file" onChange={jsonFileUpload} />
      </div>
    </div>
  );
};

export default ImportExportButton;