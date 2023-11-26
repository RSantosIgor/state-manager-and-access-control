import { NextResponse } from 'next/server';
import { create, factory }  from '@/models/profile';
import { signUp } from '@/models/auth';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
const supabaseServer = createRouteHandlerClient({cookies});

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const dataReq = await request.json();
    const first_name = String(dataReq.first_name);
    const last_name = String(dataReq.last_name);
    const email = String(dataReq.email);
    const password = String(dataReq.password);
    const photo_url = String(dataReq.photo_url);
    const user = {first_name, last_name, email, photo_url};
    const authResponse = (await signUp(email, password, requestUrl.origin, supabaseServer));
    const userId = authResponse.data.user?.id;

    const {error} = await create(factory({id: userId, ...user}), supabaseServer);

    if (error) throw new Error(error.message);
    console.log('Error SignUp', error);
    return NextResponse.json({data: authResponse.data}, {status: 200});
  } catch (error) {
    return NextResponse.json({error}, {status: 500});
  }
}