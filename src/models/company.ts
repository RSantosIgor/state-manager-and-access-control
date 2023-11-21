import { Company } from "@/types/company";
import db from "@/lib/database/supabase";
import resource  from '@/models/resource';
import { RefTable } from "@/types/resource";

const TABLE = RefTable.company;

export const create = (data: Company) => {
    try {
        return db.create(TABLE, data)
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

export const getAll = () => {
    try {
        return db.get(TABLE);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getById = (id: number) => {
    try {
        return db.getBy(TABLE, id);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getByResourceId = (resourceId: number) => {
    try {
        return db.getMatchAny(TABLE, {resourceId});
    } catch (error) {
        return Promise.reject(error);
    }
}

export const update = (id: number, data: any) => {
    try {
        return db.update(TABLE, id, data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const remove = (id: number) => {
    try {
      return db.remove(TABLE, id);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const factory = (data: any) => {
    const company: Company = {
        id: data.id,
        createdAt: data.createdAt || new Date().getTime(),
        name: data.name,
        description: data.description,
    }
    return company;
}
