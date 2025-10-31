// app/auth/google/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const handler = async () => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  });

  return data.url
    ? NextResponse.redirect(data.url)
    : NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL!));
};

export { handler as GET, handler as POST };
