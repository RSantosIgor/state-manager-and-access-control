import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Dashboard from '../../../dashboard/page'


export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const dataReq = await request.json();
    const email = String(dataReq.email);
    const password = String(dataReq.password);
    const supabase = createRouteHandlerClient({ cookies });
  
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    return NextResponse.redirect(`${requestUrl.origin}/'dashboard`, {
      status: 301,
    });
  } catch (error) {
    return NextResponse.json({error}, {status: 500});
  }

}