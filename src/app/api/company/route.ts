import { NextResponse, type NextRequest } from 'next/server';
import { create, factory, getAll, update, remove } from '@/models/company';
import { Company } from '@/types/company';

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
        const companyData: Company = await request.json();
        const companyCreated = await create(factory(companyData));
        const data = companyCreated.data;
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {  
    try {
        const companyData = await request.json();
        await update(companyData.id, companyData);        
        return NextResponse.json({message: 'Success'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}
