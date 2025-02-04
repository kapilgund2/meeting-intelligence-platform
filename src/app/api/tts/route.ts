import { NextResponse } from 'next/server';
import { generateSpeech } from '@/lib/tts';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const audioUrl = await generateSpeech(text);

    return NextResponse.json({ success: true, data: { audioUrl } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'TTS failed' }, { status: 500 });
  }
}
