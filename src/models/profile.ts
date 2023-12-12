import { Profile } from "@/types/profile";
import db from "@/lib/database/supabase";
import { Permission } from "@/types/permission";

const TABLE = 'profiles';

export const create = (data: Profile, supabaseClient: any = undefined) => {
    try {
        return db.create(TABLE, data, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getById = (id: string, supabaseClient: any = undefined) => {
    try {
        return db.getBy(TABLE, id, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getByEmail = (email: string, supabaseClient: any = undefined) => {
    try {
        return db.getMatchAny(TABLE, {email}, '*', supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getByIds = (ids: string[], supabaseClient: any = undefined) => {
    try {
        return db.getByIdIn(TABLE, ids, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}


export const update = (id: string, data: any, supabaseClient: any = undefined) => {
    try {
        return db.update(TABLE, id, data, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const remove = (id: string, supabaseClient: any = undefined) => {
    try {
      return db.remove(TABLE, id, supabaseClient);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const factory = (data: any) => {
    const profile: Profile = {
        id: data.id,
        created_at: data.created_at || new Date().getTime(),
        first_name: data.first_name,
        last_name: data.last_name || '',
        email: data.email,
        photo_url: data.photo_url || ''
    }
    return profile;
}

export const setProfileInPermission = async (permissions: Permission[], supabaseClient: any =  undefined) => {
    
    const userIds = permissions.map(permission => String(permission.user_id));
    const { data } = await getByIds(userIds, supabaseClient);
    const profiles: Profile[] = data ? data?.map(d => factory(d)): [];
    return permissions.map((permission: Permission) => {
        const profileP = profiles.filter(profile =>  permission.user_id == profile.id)[0];
        return {...permission, user: profileP}
    });

    return permissions;
}

export default {getByEmail}