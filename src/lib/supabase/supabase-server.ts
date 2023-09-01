/* eslint-disable import/no-anonymous-default-export */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default () =>
createServerComponentClient({cookies});