import { Hierarchy, Resource } from "@/types/resource";
import db from "@/lib/database/supabase";
import permission from '@/models/permission';
import { user } from '@/models/auth';

const TABLE = 'resources';

export const create = (data: Resource) => {
    try {
        return db.create(TABLE, data)
        .then(async (response: any) => {
            const dataRes = response.data;
            if (data.level === 0) {
                const userData = (await user).data.session?.user;
                await permission.create(permission.factory({ 
                    resourceId: dataRes.id,
                    role: 'manager',
                    userId: userData?.id
                }));
            }
        })
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

export const getByResourceTableId = (resourceTableId: number) => {
    try {
        return db.getMatchAny(TABLE, {resourceTableId});
    } catch (error) {
        return Promise.reject(error);
    }
}

export const update = (id: number, data: Resource) => {
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

export const factory = (data: any, fatherResource?: Resource) => {
    const resource: Resource = {
        createdAt: data.createdAt || new Date().getTime(),
        resourceTableId: data.resourceTableId,
        refTable: data.refTable,
        level: getLevel(fatherResource),
	    hierarchy: getHierarchy(fatherResource)
    }
    return resource;
}

const getHierarchy = (resource?: Resource): Hierarchy[] => {
    if (resource) {
        return [
            ...resource.hierarchy,
            {resourceId: Number(resource.id), level: resource.level, label: resource.refTable}
        ];
    }
    return [];
}

const getLevel = (resource?: Resource): number => {
    return resource ? resource.level + 1: 0;
}

const functions = { create, getById, getByResourceTableId, update, remove, factory };

export default functions;