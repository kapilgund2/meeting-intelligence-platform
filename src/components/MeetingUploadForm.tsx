"use client";

import { useState } from 'react';

interface MeetingUploadFormProps {
  setResult: (result: { summary: string; actionItems: string[] } | null) => void;
}

export default function MeetingUploadForm({ setResult }: MeetingUploadFormProps) {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/processTranscript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transcript })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert('Error processing transcript');
      }
    } catch (error) {
      console.error(error);
      alert('Error processing transcript');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-4">
      <label className="block mb-2 font-bold">Paste Meeting Transcript:</label>
      <textarea
        className="w-full border border-gray-300 p-2 rounded mb-4"
        rows={6}
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste transcript here..."
        required
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Process Transcript'}
      </button>
    </form>
  );
}
