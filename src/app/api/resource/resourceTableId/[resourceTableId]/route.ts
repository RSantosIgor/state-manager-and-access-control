import { NextRequest, NextResponse } from "next/server";
import { remove, getById, getByResourceTableId } from '@/models/resource';



export async function GET(request: NextRequest, { params }: { params: { resourceTableId: number } }) {  
    try {
        const id = params.resourceTableId;
        const resources = (await getByResourceTableId(Number(id))).data;        
        return NextResponse.json({data: resources});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}
