// app/api/ai-summarize/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { url } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  // Mock AI Summary (Replace with real AI later)
  const mockSummary = `AI Summary of: ${url}\n\nΔημοσίευση από Δήμο Θεσσαλονίκης: Ανακοίνωση για νέα έργα υποδομής στο κέντρο. Προϋπολογισμός: 2.5M€. Έναρξη: 2025.`;

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: `AI: ${url.split('/').pop()}`,
      summary: mockSummary,
      source_url: url,
      municipality_code: '6114'
    });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true, data });
};
