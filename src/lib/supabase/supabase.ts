import { isWindowAvailable } from "@/util/navigation";
import { createClientComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export default isWindowAvailable() ? createClientComponentClient(): createRouteHandlerClient({cookies});
