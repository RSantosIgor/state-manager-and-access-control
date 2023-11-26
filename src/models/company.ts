import { Company } from "@/types/company";
import db from "@/lib/database/supabase";
import resource  from '@/models/resource';
import { RefTable } from "@/types/resource";

const TABLE = RefTable.company;

export const create = (data: Company, supabaseClient: any = undefined) => {
    try {
        return db.create(TABLE, data, supabaseClient)
        .then(async (response: any) => {
            const data = response.data;
            const resourceData = resource.factory({ 
                resourceTableId: data.id,
                refTable: RefTable.company
            });
            await resource.create(resourceData);
            return data;
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getAll = (supabaseClient: any = undefined) => {
    try {
        return db.get(TABLE, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getById = (id: number, supabaseClient: any = undefined) => {
    try {
        return db.getBy(TABLE, id, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getByResourceId = (resourceId: number, supabaseClient = undefined) => {
    try {
        return db.getMatchAny(TABLE, {resourceId}, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const update = (id: number, data: any, supabaseClient: any = undefined) => {
    try {
        return db.update(TABLE, id, data, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const remove = (id: number, supabaseClient: any = undefined) => {
    try {
      return db.remove(TABLE, id, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const factory = (data: any) => {
    const company: Company = {
        id: data.id,
        created_at: data.created_at || new Date().getTime(),
        name: data.name,
        description: data.description,
    }
    return company;
}
