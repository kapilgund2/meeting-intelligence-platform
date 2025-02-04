"use client";

import { useState } from 'react';

export default function AudioUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setTranscript(data.data.transcript);
      } else {
        alert("Error during transcription");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to transcribe the file.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
      <label className="block mb-2 font-bold text-gray-700">Upload Audio File:</label>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload and Transcribe"}
      </button>
      {transcript && (
        <div className="mt-4">
          <h3 className="font-bold">Transcription:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </form>
  );
}
