# 📝 Meeting Intelligence Platform

🚀 **AI-powered meeting transcription, summarization, and retrieval system** built with **Next.js, Whisper, LangChain, and Pinecone**.

## **📌 Features**
- 🎙 **Transcribe Meetings** – Upload MP3 files, and OpenAI Whisper transcribes the speech.
- 📄 **Generate Summaries** – Extract key points, summaries, and action items using LLMs.
- 🔍 **Search Past Meetings** – Use **RAG (Retrieval-Augmented Generation)** to find relevant discussions.
- 📈 **Monitor AI Performance** – Track model drift & quality using **Arize AI / WhyLabs**.
- 🚀 **Deployed on Vercel** – Ensures high availability & performance.

---

## **⚡ Tech Stack**
| Technology       | Purpose |
|-----------------|---------|
| **Next.js 15** (App Router, TypeScript) | Frontend & API Routes |
| **OpenAI Whisper** | Speech-to-text transcription |
| **LangChain** | Summarization & RAG (Retrieval-Augmented Generation) |
| **Pinecone** | Vector Database for embedding search |
| **Formidable** | File upload handling |
| **TailwindCSS** | UI styling |
| **Vercel** | Deployment |

---

## **🚀 Getting Started**


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
