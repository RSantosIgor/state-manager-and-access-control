import { type SupabaseClient } from '@supabase/auth-helpers-nextjs';
import supabase from '@/lib/supabase/supabase';

const create = (table: string, data: any, database: SupabaseClient = supabase) => {
    try {
       return database.from(table).insert({...data, createdAt: new Date().getTime()});
    } catch (error) {
        return Promise.reject(error);
    }
}

const getBy = (table: string, id: number | string, columns: string = '*', database: SupabaseClient = supabase) => {
    try {
       return database.from(table).select(columns).match({id});
    } catch (error) {
        return Promise.reject(error);
    }
}

const get = (table: string, columns: string = '*', database: SupabaseClient = supabase) => {
  try {
     return database.from(table).select(columns);
  } catch (error) {
      return Promise.reject(error);
  }
}

const getMatchAny = (table: string, dataMatch: any, columns: string = '*', database: SupabaseClient = supabase) => {
  try {
     return database.from(table).select(columns).match(dataMatch);
  } catch (error) {
      return Promise.reject(error);
  }
}

const update = (table: string, id: number | string, data: any, database: SupabaseClient = supabase) => {
  try {
    database.from(table).update({...data, updatedAt: new Date().getTime()}).match({id});
  } catch (error) {
      return Promise.reject(error);
  }
}


const remove = (table: string, id: number | string, database: SupabaseClient = supabase) => {
  try {
    return database.from(table).delete().match({id});
  } catch (error) {
      return Promise.reject(error);
  }
}

const functions = { create, get, getBy, getMatchAny, update, remove }

export default functions;
