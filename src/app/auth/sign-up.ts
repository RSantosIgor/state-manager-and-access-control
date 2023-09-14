import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const name = String(formData.get('name'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const photoUrl = String(formData.get('photoUrl'));
  const user = {name, email, password, photoUrl};
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  //await supabase.from('profiles').insert(user);

  return NextResponse.redirect(`${requestUrl.origin}/'dashboard`, {
    status: 301,
  })
}