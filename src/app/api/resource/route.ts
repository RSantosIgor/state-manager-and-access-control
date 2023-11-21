import { NextResponse, type NextRequest } from 'next/server';
import { getAll } from '@/models/resource';
import { Resource } from '@/types/resource';

export async function GET(request: NextRequest) {
    try {
        const resources = (await getAll()).data;
        return NextResponse.json({ data: resources });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}
