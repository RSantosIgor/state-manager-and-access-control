import { type SupabaseClient } from '@supabase/auth-helpers-nextjs';
import supabase from '@/lib/supabase/supabase-browser';

const create = (table: string, data: any, database: SupabaseClient = supabase) => {
    try {
       return database.from(table).insert({...data, created_at: new Date().getTime()}).select('*');
    } catch (error) {
        return Promise.reject(error);
    }
}

const getBy = (table: string, id: number | string, columns: string = '*', database: SupabaseClient = supabase) => {
    try {
       return database.from(table).select(columns).match({id}).order('created_at');;
    } catch (error) {
        return Promise.reject(error);
    }
}

const getByIdIn = (table: string, id: string [] | number[], columns: string = '*', database: SupabaseClient = supabase) => {
  try {
     return database.from(table).select(columns).in('id', id).order('created_at');;
  } catch (error) {
      return Promise.reject(error);
  }
}

const get = (table: string, columns: string = '*', database: SupabaseClient = supabase) => {
  try {
     return database.from(table).select(columns).order('created_at');
  } catch (error) {
      return Promise.reject(error);
  }
}

const getMatchAny = (table: string, dataMatch: any, columns: string = '*', database: SupabaseClient = supabase) => {
  try {
     return database.from(table).select(columns).match(dataMatch).order('created_at');;
  } catch (error) {
      return Promise.reject(error);
  }
}

const update = (table: string, id: number | string, data: any, database: SupabaseClient = supabase) => {
  try {
    return database.from(table).update({...data, updated_at: new Date().getTime()}).eq('id', id).select('*');
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

const functions = { create, get, getBy, getByIdIn, getMatchAny, update, remove }

export default functions;
