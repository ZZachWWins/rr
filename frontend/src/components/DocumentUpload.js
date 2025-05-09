import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dbraufdni";
  const unsignedUploadPreset = "rapid_refund_preset";

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus("Please select a file!");
      return;
    }

    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!validTypes.includes(file.type)) {
      setUploadStatus("Only PDF, JPEG, or PNG files are allowed!");
      return;
    }
    if (file.size > maxSize) {
      setUploadStatus("File size must be less than 5MB!");
      return;
    }

    setIsLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", unsignedUploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        data
      );
      const fileUrl = response.data.secure_url;

      const token = localStorage.getItem("token");
      if (!token) {
        setUploadStatus("Please log in to upload documents.");
        setIsLoading(false);
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/documents`,
        { fileUrl, fileName: file.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUploadStatus(`Upload successful! File saved.`);
      setIsLoading(false);
    } catch (error) {
      setUploadStatus("Upload failed. Try again!");
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Upload Tax Documents | Rapid Refund</title>
        <meta
          name="description"
          content="Upload your tax documents securely with Rapid Refund at rapid-refund.com. Fast, easy, and encrypted submission for your tax refund."
        />
        <meta name="keywords" content="rapid refund upload, tax document upload, secure tax filing" />
        <link rel="canonical" href="https://rapid-refund.com/upload" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Rapid Refund Document Upload',
            'description': 'Securely upload tax documents for fast refund processing.',
            'url': 'https://rapid-refund.com/upload',
          })}
        </script>
      </Helmet>
      <div className="text-center glass-container py-10">
        <h2 className="text-2xl font-bold mb-4 text-white">Securely Upload Your Tax Documents</h2>
        <p className="mb-4 text-white">Submit your tax forms to Rapid Refund at rapid-refund.com with bank-level encryption to start your refund process.</p>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="input-field w-full"
            aria-label="Upload Tax Document"
          />
          <button type="submit" className="cta-btn" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Document"}
          </button>
          {isLoading && <div className="loader mt-4"></div>}
        </form>
        {uploadStatus && <p className="mt-4 text-white">{uploadStatus}</p>}
      </div>
    </>
  );
};

export default DocumentUpload;