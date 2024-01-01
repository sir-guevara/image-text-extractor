import axios from "axios";
import React, { useState } from "react";
import { Check, Copy, Upload } from "react-feather"; // Import Feather Icons

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // Display the selected image
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      console.log(imageUrl);
      setSelectedImageUrl(imageUrl);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Please select a file.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8000/extract_text",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setText(response.data.text);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    // Reset copied status after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-2">
            Image Text Extractor
          </h2>
          <p className="text-gray-500">
            Extract text from your images with ease!
          </p>
        </div>

        <div
          className={`border-dashed border-2 cursor-pointer rounded-md border-gray-300 p-4 mb-4 flex justify-center items-center ${
            file ? "bg-gray-100" : "bg-white"
          }`}
          onClick={() => document.querySelector('input[type="file"]').click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {file ? (
            <div>
              <p className="text-gray-600">{file.name}</p>
              <p className="text-sm text-gray-500">Click / Drop to replace</p>
            </div>
          ) : (
            <p className="text-gray-500 flex justify-center items-center">
              <Upload size={24} />
              Click or drag and drop your image here
            </p>
          )}
          {selectedImageUrl && (
            <img
              src={selectedImageUrl}
              alt="Selected"
              style={{ maxWidth: "100px" }}
              className="mb-4 w-full rounded"
            />
          )}
        </div>

        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg"
        />
        <div></div>

        <button
          className="bg-stone-900 text-white py-2 px-4 rounded-md mb-4 w-full flex justify-center items-center"
          onClick={handleUpload}
          disabled={loading}
        >
          <Check size={16} className="mr-2" />
          Extract Text
        </button>

        {loading && <p className="text-gray-600">Uploading...</p>}

        {text && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">Extracted Text</p>
            <pre className="whitespace-pre-wrap break-all bg-white p-2 border border-gray-300">
              {text}
            </pre>
            <div className="flex justify-end items-center">
              <button
                className={`mt-2 py-1 px-2 bg-stone-600 text-white rounded-md flex justify-center items-center ${
                  copied
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-stone-900"
                }`}
                onClick={handleCopyToClipboard}
                disabled={copied}
              >
                <Copy size={16} className="mr-2" />
                {copied ? "Copied!" : "Copy to clipboard"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
