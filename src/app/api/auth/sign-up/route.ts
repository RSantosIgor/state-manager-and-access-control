import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const dataReq = await request.json();
    const name = String(dataReq.name);
    const email = String(dataReq.email);
    const password = String(dataReq.password);
    const photo_url = String(dataReq.photo_url);
    const user = {name, email, photo_url};
    const supabase = createRouteHandlerClient({ cookies });
    const authResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    });
    const userId = authResponse.data.user?.id;
    await supabase.from('profiles').insert({id: userId, ...user});
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
      status: 301,
    });
  } catch (error) {
    return NextResponse.json({error}, {status: 500});
  }
}