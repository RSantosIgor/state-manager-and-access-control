import supabase from "@/lib/supabase/supabase";

export const user = supabase.auth.getSession();