import { OpenAI } from "openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function transcribeAudio(filePath: string) {
  const audioFile = fs.createReadStream(path.resolve(filePath));
  const response = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: audioFile,
  });

  return response.text;
}
