import { SupabaseClient } from "@supabase/supabase-js";
import supabase from "@/lib/supabase/supabase-browser";
import { getById } from "./profile";

export const user = (supabaseClient: SupabaseClient = supabase) => {
    try {
        return supabaseClient.auth.getSession();
    } catch (error) {
        return Promise.reject(error);
    }
}


export const signOut = (supabaseClient: SupabaseClient = supabase) => {
    try {
        return supabaseClient.auth.signOut();
    } catch (error) {
        return Promise.reject(error);
    }
 }

export const signInWithPassword = (email: string, password: string, supabaseClient: SupabaseClient = supabase) => {
    try {
        return supabaseClient.auth.signInWithPassword({
            email,
            password,
        });   
    } catch (error) {
        return Promise.reject(error);
    }
}

export const signUp = (email: string, password: string, requestUrl: string, supabaseClient: SupabaseClient = supabase) => {
    try {
        return supabaseClient.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${requestUrl}/auth/callback`,
              
            },
        });   
    } catch (error) {
        return Promise.reject(error);
    }
}

export const onAuthStateChange = (callback: any, supabaseClient: SupabaseClient = supabase) => {
    return supabaseClient
    .auth
    .onAuthStateChange(callback);
}