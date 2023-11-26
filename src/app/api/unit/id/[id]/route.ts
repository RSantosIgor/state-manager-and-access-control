import { NextResponse, type NextRequest } from 'next/server';
import { create, factory, getAll, update, remove } from '@/models/unit';
import supabaseServer from '@/lib/supabase/supabase-server';

export async function GET(request: NextRequest) {
    try {
        const units = (await getAll(supabaseServer)).data;
        return NextResponse.json({ data: units });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function POST(request: NextRequest) {  
    try {
        const {unitData, fatherResourceData} = await request.json();
        const unitCreated = await create(factory(unitData), fatherResourceData, supabaseServer);
        const data = unitCreated.data;
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {  
    try {
        const unitData = await request.json();
        await update(unitData.id, unitData, supabaseServer);        
        return NextResponse.json({message: 'Success'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}