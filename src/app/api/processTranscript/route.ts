import { NextResponse } from 'next/server';
import { summarizeTranscript, extractActionItems } from '@/lib/langchain';

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json();
    const summary = await summarizeTranscript(transcript);
    const actionItems = await extractActionItems(transcript);
    
    return NextResponse.json({ success: true, data: { summary, actionItems } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Processing failed' }, { status: 500 });
  }
}
