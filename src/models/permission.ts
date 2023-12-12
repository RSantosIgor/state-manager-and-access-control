import db from "@/lib/database/supabase";
import { Permission, PermissionExtended } from "@/types/permission";
import { Resource, ResourceExtended } from "@/types/resource";
import { setProfileInPermission } from "./profile";

const TABLE = 'permissions';

export const create = (data: Permission, supabaseClient: any = undefined) => {
    try {
        //Todo: Future - Check if user exists
        return db.create(TABLE, data, supabaseClient)
        .then(response => {
            if(response.error) {
                console.log(response.error);
            }
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


export const getByUser = (userId: string, supabaseClient: any = undefined) => {
    try {
        return db.getMatchAny(TABLE, {userId}, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getByResource = (resourceId: number, supabaseClient: any = undefined) => {
    try {
        return db.getMatchAny(TABLE, {resourceId}, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getByResources = (resourceIds: number[], supabaseClient: any = undefined) => {
    try {
        return db.getByAnyIn(TABLE, 'resource_id', resourceIds, supabaseClient);
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
    const permission: Permission = {
        id: data.id,
        created_at: data.created_at || new Date().getTime(),
        user_id: data.user_id,
        resource_id: data.resource_id,
        role: data.role
    }
    return permission;
}

export const setPermissionsInResource = async (resources: Resource[], supabaseClient: any = undefined) => {
    const resourcesIds = resources.map(resource => Number(resource.id));
    const { data } = await getByResources(resourcesIds, supabaseClient);
    const permissions: Permission[] = data ? data?.map(d => factory(d)): [];
    const permissionsAndProfile: PermissionExtended[] = await setProfileInPermission(permissions, supabaseClient);
    return resources.map((resource: Resource) => {
        const permissionResource = permissionsAndProfile.filter(pP => pP.resource_id == resource.id);
        return {...resource, permissions: permissionResource}
    });
}
const functions = { create, getById, getByResource, getByUser, update, remove, factory };

export default functions;