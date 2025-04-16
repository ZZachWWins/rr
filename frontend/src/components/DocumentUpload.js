import React, { useState } from "react";
import axios from "axios";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const cloudName = "dbraufdni";
  const unsignedUploadPreset = "rapid_refund_preset"; // Replace with your actual preset (create one in Cloudinary dashboard)

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus("Please select a file!");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", unsignedUploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        data
      );
      setUploadStatus(`Upload successful! URL: ${response.data.secure_url}`);
      // TODO: Send response.data.secure_url to Netlify Function for processing
    } catch (error) {
      setUploadStatus("Upload failed. Try again!");
      console.error(error);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Upload Tax Documents</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 rounded bg-white bg-opacity-10 text-white"
        />
        <button
          type="submit"
          className="cta-btn bg-teal-500 text-white p-2 rounded"
        >
          Upload Document
        </button>
      </form>
      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default DocumentUpload;