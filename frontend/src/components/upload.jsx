import React, { useState } from "react";

const FileUpload = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-indigo-500 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-indigo-500 hover:text-white">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V8l-4-4H4zm2 4h4a1 1 0 010 2H6a1 1 0 010-2zm0 4h8a1 1 0 010 2H6a1 1 0 010-2zm0 4h8a1 1 0 010 2H6a1 1 0 010-2z"
            clipRule="evenodd"
          />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a PDF file</span>
        <input
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>
      {selectedFile && (
        <p className="ml-4 text-gray-700">Selected file: {selectedFile.name}</p>
      )}
    </div>
  );
};

export default FileUpload;
