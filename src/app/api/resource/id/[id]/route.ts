import { NextRequest, NextResponse } from "next/server";
import { remove, getById } from '@/models/resource';


export async function GET(request: NextRequest, { params }: { params: { id: number } }) {  
    try {
        const id = params.id;
        const data = (await getById(Number(id))).data;        
        return NextResponse.json({data});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {  
    try {
        const id = params.id;
        await remove(Number(id));        
        return NextResponse.json({message: 'Success'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}