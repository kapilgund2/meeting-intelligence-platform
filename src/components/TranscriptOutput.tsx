"use client";

interface TranscriptOutputProps {
  result: {
    summary: string;
    actionItems: string[];
  };
}

export default function TranscriptOutput({ result }: TranscriptOutputProps) {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="font-bold mb-2">Meeting Summary:</h2>
      <p className="mb-4">{result.summary}</p>
      <h2 className="font-bold mb-2">Action Items:</h2>
      {result.actionItems.length > 0 ? (
        <ul className="list-disc pl-5">
          {result.actionItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No action items found.</p>
      )}
    </div>
  );
}
