import { NextResponse, type NextRequest } from 'next/server';
import { create, factory, getAll, update, remove } from '@/models/departament';
import { Departament } from '@/types/departament';

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
        const {departamentData, fatherResourceData} = await request.json();
        const departamentCreated = await create(factory(departamentData), fatherResourceData);
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
        await update(departamentData.id, departamentData);        
        return NextResponse.json({message: 'Success'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}