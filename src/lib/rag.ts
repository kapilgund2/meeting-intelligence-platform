// src/lib/rag.ts
import { PineconeClient } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const pinecone = new PineconeClient();
await pinecone.init({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: process.env.PINECONE_ENVIRONMENT!, 
});

// The name of your existing Pinecone index.
const indexName = 'meeting-intelligence';

export async function storeTranscript(transcript: string, meetingId: string) {
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex: pinecone.Index(indexName),
    }
  );

  // Add the transcript document along with its metadata.
  await vectorStore.addDocuments([
    { pageContent: transcript, metadata: { meetingId } }
  ]);
}

export async function searchRelevantMeetings(query: string) {
  // Create a vector store using the existing index.
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex: pinecone.Index(indexName),
    }
  );

  // Perform a similarity search for the top 3 matching documents.
  const results = await vectorStore.similaritySearch(query, 3);
  return results.map(doc => doc.pageContent);
}
