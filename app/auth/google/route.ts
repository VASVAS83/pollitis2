import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  });

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL!));
};
