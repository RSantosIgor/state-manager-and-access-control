import { Company } from "@/types/company";
import db from "@/lib/database/supabase";
import resource  from '@/models/resource';
//import { RefTable } from "@/types/resource";

const TABLE = 'companies';

export const create = (data: Company, supabaseClient: any = undefined) => {
    try {
        const resourceData = resource.factory({ 
            resource_table_id: null,
            ref_table: TABLE
        });
        return resource.create(resourceData, supabaseClient)
        .then(async (response: any) => {
            const resourceDoc = response.data[0];
            const resource_id: number = resourceDoc.id;
            return db.create(TABLE, {...data, resource_id}, supabaseClient);
        })
        .then(async (response: any) => {
            const companyDoc = response.data[0];
            const {data, error} = await resource.update(companyDoc.resource_id, {resource_table_id: companyDoc.id}, supabaseClient);
            console.log(error);
            return response; 
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

export const getByIds = (ids: number[], supabaseClient: any = undefined) => {
    try {
        return db.getByIdIn(TABLE, ids, supabaseClient);
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
        resource_id: data.resource_id
    }
    return company;
}

const functions = { create, getAll,  getById, getByResourceId, update, remove, factory };

export default functions;