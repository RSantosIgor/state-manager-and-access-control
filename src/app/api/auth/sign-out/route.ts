import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const supabase = createRouteHandlerClient({ cookies });
    const {data: { session }} = await supabase.auth.getSession();
  
    if (session) {
      await supabase.auth.signOut();
    }

    return NextResponse.redirect(`${requestUrl.origin}/authentication`, {
      status: 301
    }); 
  } catch (error) {
    return NextResponse.json({error}, {status: 500});
  }
}