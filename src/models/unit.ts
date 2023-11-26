import { Unit } from "@/types/unit";
import db from "@/lib/database/supabase";
import { RefTable, Resource } from "@/types/resource";
import resource from "@/models/resource";

const TABLE = RefTable.unit;

export const create = (data: Unit, fatherResource: Resource, supabaseClient: any = undefined) => {
    try {
        return db.create(TABLE, data, supabaseClient)
            .then(async (response: any) => {
                const data = response.data;
                const resourceData = resource.factory({ 
                    resourceTableId: data.id,
                    refTable: RefTable.unit
                }, fatherResource);
                await resource.create(resourceData, supabaseClient);
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
    const unit: Unit = {
        id: data.id,
        created_at: data.created_at || new Date().getTime(),
        name: data.name,
        description: data.description
    }
    return unit;
}