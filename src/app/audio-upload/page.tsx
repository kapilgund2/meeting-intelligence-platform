import AudioUploadForm from '@/components/AudioUploadForm';

export default function AudioUploadPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Upload Your Voice Recording</h1>
        <p className="text-gray-600 mb-6">
          Upload a voice recording of your meeting to get AI-powered transcriptions and summaries.
        </p>
        <AudioUploadForm />
      </div>
    </main>
  );
}
