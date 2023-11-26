import { Permission } from '@/types/permission';
import { NextResponse, type NextRequest } from 'next/server';
import { create, factory, getAll, update, remove } from '@/models/permission';
import supabaseServer from '@/lib/supabase/supabase-server';

export async function GET(request: NextRequest) {
    try {
        const permissions = (await getAll(supabaseServer)).data;
        return NextResponse.json({ data: permissions });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function POST(request: NextRequest) {  
    try {
        const permissionData: Permission = await request.json();
        const permissionCreated = await create(factory(permissionData), supabaseServer);
        const data = permissionCreated.data;
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {  
    try {
        const permissionData = await request.json();
        await update(permissionData.id, permissionData, supabaseServer);        
        return NextResponse.json({message: 'Success'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

export async function DELETE(request: NextRequest) {  
    try {
        const permissionData = await request.json();
        await remove(permissionData.id, supabaseServer);        
        return NextResponse.json({message: 'Success'});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error}, {status: 500});
    }
}

