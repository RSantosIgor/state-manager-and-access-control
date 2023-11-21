import { Profile } from "@/types/profile";
import db from "@/lib/database/supabase";

const TABLE = 'profiles';

export const create = (data: Profile) => {
    try {
        return db.create(TABLE, data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getById = (id: string) => {
    try {
        return db.getBy(TABLE, id);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const update = (id: string, data: Profile) => {
    try {
        return db.update(TABLE, id, data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const remove = (id: string) => {
    try {
      return db.remove(TABLE, id);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const factory = (data: any) => {
    const profile: Profile = {
        id: data.id,
        createdAt: data.createdAt || new Date().getTime(),
        firstName: data.firstName,
        lastName: data.lastName || '',
        email: data.email,
        photoUrl: data.photo_url || ''
    }
    return profile;
}