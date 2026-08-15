-- Final catalogue Storage access model for a ground-up rebuild.
-- Supabase owns the storage schema; this migration defines only application
-- policies on storage.objects after the public baseline creates the admin
-- authorization helper.

create policy "Public can read catalogue images"
on storage.objects
for select
to anon, authenticated
using (bucket_id in ('category-images', 'product-images'));

create policy "Admin can upload catalogue images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('category-images', 'product-images')
  and (select private.is_cwscales_admin())
);

create policy "Admin can update catalogue images"
on storage.objects
for update
to authenticated
using (
  bucket_id in ('category-images', 'product-images')
  and (select private.is_cwscales_admin())
)
with check (
  bucket_id in ('category-images', 'product-images')
  and (select private.is_cwscales_admin())
);

create policy "Admin can delete catalogue images"
on storage.objects
for delete
to authenticated
using (
  bucket_id in ('category-images', 'product-images')
  and (select private.is_cwscales_admin())
);
