import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: query,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    return NextResponse.json({ result: response.data.choices[0].text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: 'POST' } });
}
