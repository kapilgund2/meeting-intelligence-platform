"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6">Meeting Intelligence Platform</h1>
        <p className="text-gray-600 mb-6">
          Upload your meeting transcript or voice recording to generate AI-powered summaries and action items.
        </p>
        <div className="flex flex-col space-y-4">
          {/* Link to upload meeting transcript */}
          <Link
            href="/transcript-upload"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
          >
            Upload Meeting Transcript
          </Link>

          {/* Link to upload voice recording */}
          <Link
            href="/audio-upload"
            className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700"
          >
            Upload Voice Recording
          </Link>
        </div>
      </div>
    </main>
  );
}
