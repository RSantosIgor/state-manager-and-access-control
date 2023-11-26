import { NextResponse, type NextRequest } from 'next/server';
import { getAll } from '@/models/resource';
import supabaseServer from '@/lib/supabase/supabase-server';

export async function GET(request: NextRequest) {
    try {
        const resources = (await getAll(supabaseServer)).data;
        return NextResponse.json({ data: resources });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}
