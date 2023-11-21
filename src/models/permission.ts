import db from "@/lib/database/supabase";
import { Permission } from "@/types/permission";

const TABLE = 'permissions';

export const create = (data: Permission) => {
    try {
        //Todo: Future - Check if user exists
        return db.create(TABLE, data);
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

export const getByUser = (userId: string) => {
    try {
        return db.getMatchAny(TABLE, {userId});
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getByResource = (resourceId: number) => {
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
    const permission: Permission = {
        createdAt: data.createdAt || new Date().getTime(),
        userId: data.userId,
        resourceId: data.resourceId,
        role: data.role
    }
    return permission;
}


const functions = { create, getById, getByResource, getByUser, update, remove, factory };

export default functions;