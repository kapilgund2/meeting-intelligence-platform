import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function generateSpeech(text: string) {
  const response = await axios.post(
    "https://api.play.ht/synthesize",
    { text, voice: "en-US-JennyNeural" },
    { headers: { Authorization: `Bearer ${process.env.PLAYHT_API_KEY}` } }
  );

  return response.data.audioUrl;
}
