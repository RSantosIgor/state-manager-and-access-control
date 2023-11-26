import { NextRequest, NextResponse } from "next/server";
import { getByResourceTableId } from '@/models/resource';
import supabaseServer from "@/lib/supabase/supabase-server";


export async function GET(request: NextRequest, { params }: { params: { resourceTableId: number } }) {  
    try {
        const id = params.resourceTableId;
        const resources = (await getByResourceTableId(Number(id), supabaseServer)).data;        
        return NextResponse.json({data: resources});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}
