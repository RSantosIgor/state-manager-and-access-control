/* eslint-disable import/no-anonymous-default-export */
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default  createRouteHandlerClient({cookies});
