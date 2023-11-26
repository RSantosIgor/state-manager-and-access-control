import { signOut, user } from '@/models/auth';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabaseServer = createRouteHandlerClient({cookies});
    const {data: { session }} = await user(supabaseServer);
  
    if (session) {
       const {error} = await signOut(supabaseServer);
       if (error) throw new Error(error.message);
       console.log('Error SignOut', error);
    }

    return NextResponse.json({message: 'success'})
  } catch (error) {
    return NextResponse.json({error}, {status: 500});
  }
}