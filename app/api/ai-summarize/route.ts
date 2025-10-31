// app/api/ai-summarize/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const url = body.url?.trim();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const mockSummary = `AI Summary:\n\nΑνακοίνωση από Δήμο Θεσσαλονίκης. Έργα υποδομής, προϋπολογισμός 2.5M€, έναρξη 2025.`;

    const { error } = await supabase
      .from('posts')
      .insert({
        title: `AI: ${url.split('/').pop()?.slice(0, 30)}...`,
        summary: mockSummary,
        source_url: url,
        municipality_code: '6114'
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
