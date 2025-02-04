import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";

import { loadQAChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import dotenv from "dotenv";

dotenv.config();

const model = new OpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeTranscript(transcript: string) {
    const prompt = new PromptTemplate({
    template: "Summarize this meeting transcript concisely:\n{transcript}",
    inputVariables: ["transcript"],
    });

    const formattedPrompt = await prompt.format({ transcript });
    return await model.call(formattedPrompt);
}

export async function extractActionItems(transcript: string) {
  const prompt = new PromptTemplate({
    template: "Extract clear action items from this transcript:\n{transcript}",
    inputVariables: ["transcript"],
});

    const formattedPrompt = await prompt.format({ transcript });
    return await model.call(formattedPrompt);
}
