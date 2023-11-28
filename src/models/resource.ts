import { Hierarchy, Resource } from "@/types/resource";
import db from "@/lib/database/supabase";
import permission from '@/models/permission';
import { user } from '@/models/auth';

const TABLE = 'resources';

export const create = (data: Resource, supabaseClient: any = undefined) => {
    try {
        return db.create(TABLE, data, supabaseClient)
        .then(async (response: any) => {
            const data = response.data[0];
            if (data.level === 0) {
                const userData = (await user(supabaseClient)).data.session?.user;
                await permission.create(permission.factory({ 
                    resourceId: data.id,
                    role: 'manager',
                    userId: userData?.id
                }), supabaseClient);
            }
            return response;
        })
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

export const getByResourceTableId = (resourceTableId: number, supabaseClient: any = undefined) => {
    try {
        return db.getMatchAny(TABLE, {resourceTableId}, supabaseClient);
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

export const factory = (data: any, fatherResource?: Resource) => {
    const resource: Resource = {
        created_at: data.created_at || new Date().getTime(),
        resource_table_id: data.resource_table_id,
        ref_table: data.ref_table,
        level: getLevel(fatherResource),
	    hierarchy: getHierarchy(fatherResource)
    }
    return resource;
}

const getHierarchy = (resource?: Resource): Hierarchy[] => {
    if (resource) {
        return [
            ...resource.hierarchy,
            {resource_id: Number(resource.id), level: resource.level, label: resource.ref_table}
        ];
    }
    return [];
}

const getLevel = (resource?: Resource): number => {
    return resource ? resource.level + 1: 0;
}

const functions = { create, getById, getByResourceTableId, update, remove, factory };

export default functions;