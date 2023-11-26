import { signInWithPassword } from '@/models/auth';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const dataReq = await request.json();
    const email = String(dataReq.email);
    const password = String(dataReq.password);
    const supabaseServer = createRouteHandlerClient({cookies});
    const {data, error} = await signInWithPassword(email, password, supabaseServer);
    if (error) throw new Error(error.message);
    return NextResponse.json({data}, {status: 200});
  } catch (error) {
    return NextResponse.json({error}, {status: 500});
  }

}