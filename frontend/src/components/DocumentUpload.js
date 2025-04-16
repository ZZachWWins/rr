import React, { useState } from "react";

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const response = await fetch("/api/upload-document", {
        method: "POST",
        body: JSON.stringify({
          file: await file.text(), // Convert file to base64 or use FormData in production
          fileName: file.name,
        }),
      });
      const data = await response.json();
      console.log("Uploaded:", data.url);
      // Save URL to state or display success
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div id="upload" className="document-upload">
      <h2>Upload Your Documents</h2>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="cta-btn"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default DocumentUpload;