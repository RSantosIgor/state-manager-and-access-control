------PROFILE------
alter table public.profiles enable row level security;

create policy "Select profile"
on profiles for select
to authenticated
using ( true );

create policy "Create profile"
on profiles for create
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
using (check_permissions(auth.uid(), id, array['manager', 'writer', 'reader']));

create policy "Create resource"
on resources for create
to public
using ((level === 0) OR (check_permissions(auth.uid(), id, array['manager', 'writer'])) );

create policy "Update resource"
on resources for update
to public
using ( check_permissions(auth.uid(), id, array['manager', 'writer']) );

create policy "Delete resource"
on resources for delete
to public
using ( check_permissions(auth.uid(), id, array['manager', 'writer']) );