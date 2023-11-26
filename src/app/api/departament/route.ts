import { NextResponse, type NextRequest } from 'next/server';
import { create, factory, getAll, update, remove } from '@/models/departament';
import supabaseServer from '@/lib/supabase/supabase-server';

export async function GET(request: NextRequest) {
    try {
        const departaments = (await getAll(supabaseServer)).data;
        return NextResponse.json({ data: departaments });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function POST(request: NextRequest) {  
    try {
        const {departamentData, fatherResourceData} = await request.json();
        const departamentCreated = await create(factory(departamentData), fatherResourceData, supabaseServer);
        const data = departamentCreated.data;
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {  
    try {
        const departamentData = await request.json();
        await update(departamentData.id, departamentData, supabaseServer);        
        return NextResponse.json({message: 'Success'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}