import { NextResponse } from "next/server";
import { IncomingForm, File as FormidableFile, Files } from "formidable";
import { Readable } from "stream";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import { transcribeAudio } from "@/lib/whisper";
import { NextRequest } from "next/server";
import type { IncomingHttpHeaders } from "http"; // ✅ Correctly import HTTP headers type

const pipeline = promisify(require("stream").pipeline);

export const config = {
  api: {
    bodyParser: false, // ✅ Prevent Next.js from processing the request body
  },
};

// ✅ Convert `NextRequest` into a Proper Readable Stream with Headers
async function parseForm(request: NextRequest): Promise<{ files: Files }> {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new IncomingForm();

      // ✅ Convert request body to a buffer
      const data = await request.arrayBuffer();

      // ✅ Convert buffer to a Readable stream
      const bufferStream = new Readable();
      bufferStream.push(Buffer.from(data));
      bufferStream.push(null); // End the stream

      // ✅ Create a mock IncomingMessage-like object
      const fakeReq = Object.assign(bufferStream, {
        headers: {
          "content-type": request.headers.get("content-type") || "",
          "content-length": request.headers.get("content-length") || "0",
        } as IncomingHttpHeaders,
        method: "POST",
        url: "/api/transcribe",
      });

      // ✅ Pass the properly mocked request to `form.parse()`
      form.parse(fakeReq as any, (err, fields, files) => {
        if (err) {
          console.error("❌ Formidable Error:", err);
          reject(err);
        } else {
          resolve({ files });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log("📥 Receiving file...");

    // ✅ Use `request` directly after conversion
    const { files } = await parseForm(request);
    console.log("✅ Files received:", files);

    const uploadedFile = files?.file;
    let audioFile: FormidableFile | undefined;

    // If multiple files, take the first one
    if (Array.isArray(uploadedFile)) {
      audioFile = uploadedFile[0];
    } else {
      audioFile = uploadedFile;
    }

    if (!audioFile) {
      console.error("❌ No file uploaded");
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    console.log("📝 Processing file:", audioFile.originalFilename);

    // ✅ Define the final file path inside `uploads/`
    const uploadDir = path.join(process.cwd(), "uploads");

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const tempPath = path.join(uploadDir, audioFile.originalFilename || "temp.mp3");

    // ✅ Move file to `uploads/`
    await fs.writeFile(tempPath, await fs.readFile(audioFile.filepath));

    console.log("✅ File saved at:", tempPath);

    // ✅ Verify the file exists before passing to Whisper
    try {
      await fs.access(tempPath);
    } catch (err) {
      throw new Error(`File not found at: ${tempPath}`);
    }

    // Pass file path to Whisper API
    const transcript = await transcribeAudio(tempPath);
    console.log("📄 Transcription result:", transcript);

    return NextResponse.json({ success: true, data: { transcript } });
  } catch (error) {
    console.error("❌ Transcription Error:", error);
    return NextResponse.json(
      { success: false, error: "Transcription failed" },
      { status: 500 }
    );
  }
}
