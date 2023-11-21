import { NextResponse, type NextRequest } from 'next/server';
import { create, factory, getAll, update, remove } from '@/models/unit';

export async function GET(request: NextRequest) {
    try {
        const companies = (await getAll()).data;
        return NextResponse.json({ data: companies });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function POST(request: NextRequest) {  
    try {
        const {unitData, fatherResourceData} = await request.json();
        const unitCreated = await create(factory(unitData), fatherResourceData);
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
        await update(unitData.id, unitData);        
        return NextResponse.json({message: 'Success'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}