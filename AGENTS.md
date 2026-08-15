# Production Supabase safety rules

The Supabase project `iruyguobrzdnavnpgajl` is the live production database. Treat it as strictly read-only.

- Never run migrations, `db push`, `db reset`, seed commands, mutating SQL, RPCs that write data, Storage writes/removals, or destructive Supabase CLI commands against this project.
- Remote access is limited to metadata inspection, advisors, and discovery of schemas, grants, RLS policies, functions, and Storage policies. Do not query business rows.
- Do not repair production RLS, grants, functions, buckets, or policies. Record findings for the owner instead.
- Never print, log, commit, copy into source, or expose access tokens, database passwords, service-role keys, secret keys, or other credentials.
- Browser code may use only the public Supabase publishable key (or the legacy anon key during compatibility migration). Never use privileged credentials in frontend code.
- Linking local CLI tooling does not authorize database changes. Before every Supabase command, confirm that it is read-only.
- Repository work is limited to securing and modernizing the application around the database as it exists.
