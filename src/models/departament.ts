import { Departament } from "@/types/departament";
import db from "@/lib/database/supabase";
import { Resource } from "@/types/resource";
import resource from "@/models/resource";

const TABLE = 'departaments';

export const create = (data: Departament, fatherResource: Resource, supabaseClient: any = undefined) => {
    try {
        const resourceData = resource.factory({ 
            resource_table_id: data.id,
            ref_table: TABLE
        }, fatherResource);

        return resource.create(resourceData, supabaseClient)
        .then(async (response: any) => {
            const resourceDoc = response.data[0];
            const resource_id: number = resourceDoc.id;
            return db.create(TABLE, {...data, resource_id}, supabaseClient);
        })
        .then(async (response: any) => {
            const departamentDoc = response.data[0];
            await resource.update(departamentDoc.resource_id, {resource_table_id: departamentDoc.id}, supabaseClient);
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

export const getByResourceId = (resourceId: number, supabaseClient: any = undefined) => {
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
    const departament: Departament = {
        id: data.id,
        created_at: data.created_at || new Date().getTime(),
        name: data.name,
        description: data.description,
        resource_id: data.resource_id
    }
    return departament;
}

const functions = { create, getAll,  getById, getByResourceId, update, remove, factory };

export default functions;