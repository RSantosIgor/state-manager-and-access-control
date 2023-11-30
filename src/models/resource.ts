import { Hierarchy, Resource, ResourceExtended } from "@/types/resource";
import db from "@/lib/database/supabase";
import permission from '@/models/permission';
import { user } from '@/models/auth';
import { Company } from "@/types/company";
import { Unit } from "@/types/unit";
import { Departament } from "@/types/departament";

const TABLE = 'resources';

export const create = async (data: Resource, supabaseClient: any = undefined) => {
    try {
        const userData = (await user(supabaseClient)).data.session?.user;

        return db.create(TABLE, data, supabaseClient)
        .then(async (response: any) => {
            const data = response.data[0];
            if (data.level === 0) {
                await permission.create(permission.factory({ 
                    resource_id: data.id,
                    role: 'manager',
                    user_id: userData?.id
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
        id: data.id,
        created_at: data.created_at || new Date().getTime(),
        resource_table_id: data.resource_table_id,
        ref_table: data.ref_table,
        level: getLevel(data.level, fatherResource),
	    hierarchy: getHierarchy(data.hierarchy || [], fatherResource)
    }

    return resource;
}

export const getResourcesTree = async (resourceDataArray: any[], tableInfoObjects: Company[] | Unit[] | Departament[] = []) => {
    try {

        const resourcesData: ResourceExtended[] = resourceDataArray.map((responseData: any) => factory(responseData));
        const hashTableObjects = getHashTable(tableInfoObjects, 'resource_id');
        const hashTableResource: Record<number, ResourceExtended> = getHashTable(resourcesData);
        setTableInfo(hashTableResource, hashTableObjects);
        for (const key in hashTableResource) {
            if (hashTableResource.hasOwnProperty(key)) {
                hashTableResource[key].tableInfo = hashTableObjects[key] || null;
                getChildren(hashTableResource[key], hashTableResource);
            }
        }

        return [...Object.values(hashTableResource)];

    } catch (error) {
        return Promise.reject(error);
    }
};

const setTableInfo = (hashTableResource: Record<number,ResourceExtended>, hashTableObjects: Company[] | Unit[] | Departament[] = []) => {
    
    for (const key in hashTableResource) {
        if (hashTableResource.hasOwnProperty(key)) {
            hashTableResource[key].tableInfo = hashTableObjects[key] || null;
        }
    }
}

const getChildren = (fatherResource: ResourceExtended, hashTableResource: Record<number, ResourceExtended>) => {
    fatherResource.children = [];
    for (const key in hashTableResource) {
        if (hashTableResource.hasOwnProperty(key)) {
            const r = hashTableResource[key];
            const matchHierarchy = getMatchHierarchy(Number(fatherResource.id), r.hierarchy);
            if ((r.level - 1) === fatherResource.level && matchHierarchy) {
                fatherResource.children?.push(r);
                delete hashTableResource[Number(r?.id)];
            }
        }
    }
    
    fatherResource.children?.forEach((children: ResourceExtended) => {
        getChildren(children, hashTableResource);
    });
};

const getMatchHierarchy = (fatherId: number, hierarchy: Hierarchy[]) => {
    const hasHierarchy: boolean = Boolean(hierarchy.find(h => h.resource_id === fatherId));
    return hasHierarchy;
};

const getHashTable = (dataArray: any[], hashKey: string = 'id') => {
    const hashTable: any = {};
    for (const data of dataArray) {
        hashTable[data[hashKey]] = data
    }

    return hashTable;
};


const getHierarchy = (hierarchy: Hierarchy[], fatherResource?: Resource): Hierarchy[] => {
    if (hierarchy && hierarchy.length > 0) {
        return hierarchy;
    } else if (fatherResource) {
        return [
            ...fatherResource.hierarchy,
            {resource_id: Number(fatherResource.id), level: fatherResource.level, ref_table: fatherResource.ref_table}
        ];
    }
    return [];
}

const getLevel = (level: number, fatherResource?: Resource): number => {
    return level || level === 0 ? level: (fatherResource ? fatherResource.level + 1: 0);
}

const functions = { create, getAll, getById, getByResourceTableId, update, remove, factory };

export default functions;