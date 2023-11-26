import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const privateRoutes = ['/dashboard'];
const authRoutes = ['authentication'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const data = await supabase.auth.getSession();
  const isLoggedIn = !!data.data.session;
  console.log('hasUser', isLoggedIn);
}