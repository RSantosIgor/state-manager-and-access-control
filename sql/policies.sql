------PROFILE------
alter table public.profiles enable row level security;

create policy "Select profile"
on profiles for select
to authenticated
using ( true );

create policy "Create profile"
on profiles for insert
using ( true );

create policy "Update profile"
on profiles for update
to authenticated
using ( auth.uid() = id );

create policy "Delete profile"
on profiles for delete
to authenticated
using ( false );

------RESOURCE------
alter table resources enable row level security;

create policy "Select resource"
on resources for select
to public
using (check_permissions(auth.uid(), id, array['manager', 'writer', 'reader']) OR (NOT (resource_table_id IS DISTINCT FROM NULL)));


create policy "Create resource"
on resources for insert
to public
WITH CHECK (
    level = 0 OR
    (
        EXISTS (
            SELECT 1
            FROM jsonb_array_elements(hierarchy) AS h(obj)
            WHERE  check_permissions(auth.uid(), (obj->>'resource_id') ::bigint , array['manager'])
            
        )
    )
);

create policy "Update resource"
on resources for update
to public
WITH CHECK (check_permissions(auth.uid(), id, array['manager']));

create policy "Delete resource"
on resources for delete
to public
using ( check_permissions(auth.uid(), id, array['manager']) );