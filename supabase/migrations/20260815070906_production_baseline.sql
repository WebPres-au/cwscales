

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";

CREATE SCHEMA IF NOT EXISTS "private";

REVOKE ALL ON SCHEMA "private" FROM PUBLIC;
GRANT USAGE ON SCHEMA "private" TO "anon", "authenticated";

CREATE OR REPLACE FUNCTION "private"."is_cwscales_admin"() RETURNS boolean
    LANGUAGE "sql"
    STABLE
    SECURITY INVOKER
    SET search_path TO ''
    AS $$
  select
    (select auth.uid()) is not null
    and lower(coalesce((select auth.jwt() ->> 'email'), '')) =
      'louis@cwscales.com.au';
$$;

ALTER FUNCTION "private"."is_cwscales_admin"() OWNER TO "postgres";
REVOKE ALL ON FUNCTION "private"."is_cwscales_admin"() FROM PUBLIC, "anon", "authenticated";
GRANT EXECUTE ON FUNCTION "private"."is_cwscales_admin"() TO "anon", "authenticated";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE TYPE "public"."product_info" AS (
	"id" "uuid",
	"name" "text",
	"short_description" "text",
	"ispublic" boolean,
	"categories" "jsonb",
	"tags" "jsonb",
	"images" "jsonb"
);


ALTER TYPE "public"."product_info" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_categories"() RETURNS TABLE("name" "text", "description" "text", "subcategories" "jsonb")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE category_tree AS (
        SELECT
            c.id,
            c.name,
            c.description, -- Included description
            c.image, -- Included image
            c."isFeatured", -- Included isFeatured
            c.parent_category,
            ARRAY[]::uuid[] AS ancestors
        FROM
            public.categories c
        WHERE
            c.parent_category IS NULL 

        UNION ALL

        SELECT
            c.id,
            c.name,
            c.description, -- Included description
            c.image, -- Included image
            c."isFeatured", -- Included isFeatured
            c.parent_category,
            ct.ancestors || c.parent_category
        FROM
            public.categories c
        JOIN category_tree ct ON ct.id = c.parent_category
    )
    SELECT
        ct1.name,
        ct1.description, -- Return description of the category
        jsonb_agg(
            jsonb_build_object(
                'name', ct2.name, 
                'description', ct2.description, -- Included description for subcategory
                'image', ct2.image, -- Included image for subcategory
                'isFeatured', ct2."isFeatured" -- Included isFeatured for subcategory
            )
        ) FILTER (WHERE ct2.id IS NOT NULL) AS subcategories
    FROM
        category_tree ct1
    LEFT JOIN category_tree ct2 ON ct1.id = ct2.parent_category
    WHERE
        ct1.parent_category IS NULL
    GROUP BY
        ct1.name, ct1.description; -- Added ct1.description to GROUP BY clause
END;
$$;


ALTER FUNCTION "public"."get_categories"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" DEFAULT ''::"text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "parent_category" "uuid",
    "snake_case_name" "text" DEFAULT ''::"text" NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "image" "text",
    "description" "text" DEFAULT ''::"text"
);


ALTER TABLE "public"."categories" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_subcategories"("category_name" "text") RETURNS SETOF "public"."categories"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  SELECT c.*
  FROM categories AS c
  JOIN categories AS parent ON c.parent_category = parent.id
  WHERE parent.name = category_name;
END;
$$;


ALTER FUNCTION "public"."get_subcategories"("category_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."getproductsfromcategory"("categoryname" "text", "subcategories" "text"[] DEFAULT NULL::"text"[], "includesdrafts" boolean DEFAULT false) RETURNS TABLE("product_id" "uuid", "product_name" "text", "description" "text", "short_description" "text", "isPublic" boolean, "youtube_link" "text", "categories" "jsonb", "tags" "jsonb", "images" "jsonb")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    WITH
    filtered_categories AS (
        SELECT id
        FROM public.categories
        WHERE 
            snake_case_name = categoryName
            OR snake_case_name = ANY(subCategories)
            OR categoryName = ''
    ),
    product_categories_agg AS (
        SELECT 
            pc.product_id,
            json_agg(
                jsonb_build_object(
                    'id', c.id,
                    'name', c.name,
                    'snake_case_name', c.snake_case_name
                )
            )::jsonb as categories  -- Cast to jsonb
        FROM 
            public.product_categories pc
        JOIN
            public.categories c
            ON pc.category_id = c.id
        WHERE 
            c.id IN (SELECT id FROM filtered_categories)
        GROUP BY
            pc.product_id
    ),
    product_tags_agg AS (
        SELECT 
            pt.product_id,
            json_agg(jsonb_build_object('id', t.id, 'name', t.name))::jsonb as tags  -- Cast to jsonb
        FROM 
            public.product_tags pt
        JOIN
            public.tags t
            ON pt.tag_id = t.id
        GROUP BY
            pt.product_id
    ),
    product_images_agg AS (
        SELECT 
            pi.product_id,
            json_agg(jsonb_build_object('image_id', pi.id, 'image_path', pi.image_path))::jsonb as images  -- Cast to jsonb
        FROM 
            public.product_images pi
        GROUP BY
            pi.product_id
    )
    SELECT
        p.id as product_id,
        p.name as product_name,
        p.description,
        p.short_description,
        p."isPublic",
        p.youtube_link,
        pca.categories,
        pta.tags,
        pia.images
    FROM
        public.products p
    LEFT JOIN
        product_categories_agg pca
        ON p.id = pca.product_id
    LEFT JOIN
        product_tags_agg pta
        ON p.id = pta.product_id
    LEFT JOIN
        product_images_agg pia
        ON p.id = pia.product_id
    WHERE
        (includesDrafts OR p."isPublic")
        AND pca.product_id IS NOT NULL;
END;
$$;


ALTER FUNCTION "public"."getproductsfromcategory"("categoryname" "text", "subcategories" "text"[], "includesdrafts" boolean) OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" DEFAULT ''::"text",
    "short_description" "text" DEFAULT ''::"text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "isPublic" boolean DEFAULT true,
    "snake_case_name" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text" DEFAULT ''::"text",
    "youtube_link" "text" DEFAULT ''::"text"
);


ALTER TABLE "public"."products" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."search_products"("search_term" "text") RETURNS SETOF "public"."products"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY SELECT *
  FROM products
  WHERE to_tsvector('english', name || ' ' || description) @@ to_tsquery('english', search_term);
END;
$$;


ALTER FUNCTION "public"."search_products"("search_term" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."to_kebab_case"("str" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    result text;
BEGIN
    SELECT lower(regexp_replace(trim(str), '[^\w]+', '-', 'g'))
    INTO result;
    RETURN COALESCE(result, '');
END;
$$;


ALTER FUNCTION "public"."to_kebab_case"("str" "text") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid" NOT NULL,
    "category_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."product_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_images" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid",
    "image_path" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."product_images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_tags" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid" NOT NULL,
    "tag_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."product_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" DEFAULT ''::"text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "snake_case_name" "text" NOT NULL
);


ALTER TABLE "public"."tags" OWNER TO "postgres";


ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_snake_case_name_key" UNIQUE ("snake_case_name");



ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_images"
    ADD CONSTRAINT "product_images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_tags"
    ADD CONSTRAINT "product_tags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "tags_snake_case_name_key" UNIQUE ("snake_case_name");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_parent_category_fkey" FOREIGN KEY ("parent_category") REFERENCES "public"."categories"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_images"
    ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_tags"
    ADD CONSTRAINT "product_tags_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_tags"
    ADD CONSTRAINT "product_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Public can read categories" ON "public"."categories"
    FOR SELECT TO "anon", "authenticated" USING (true);

CREATE POLICY "Public can read tags" ON "public"."tags"
    FOR SELECT TO "anon", "authenticated" USING (true);

CREATE POLICY "Public can read published products and admin can read drafts" ON "public"."products"
    FOR SELECT TO "anon", "authenticated"
    USING (("isPublic" IS TRUE) OR (SELECT "private"."is_cwscales_admin"()));

CREATE POLICY "Public can read categories for published products" ON "public"."product_categories"
    FOR SELECT TO "anon", "authenticated"
    USING (
      (SELECT "private"."is_cwscales_admin"())
      OR EXISTS (
        SELECT 1 FROM "public"."products"
        WHERE "products"."id" = "product_categories"."product_id"
          AND "products"."isPublic" IS TRUE
      )
    );

CREATE POLICY "Public can read tags for published products" ON "public"."product_tags"
    FOR SELECT TO "anon", "authenticated"
    USING (
      (SELECT "private"."is_cwscales_admin"())
      OR EXISTS (
        SELECT 1 FROM "public"."products"
        WHERE "products"."id" = "product_tags"."product_id"
          AND "products"."isPublic" IS TRUE
      )
    );

CREATE POLICY "Public can read images for published products" ON "public"."product_images"
    FOR SELECT TO "anon", "authenticated"
    USING (
      (SELECT "private"."is_cwscales_admin"())
      OR EXISTS (
        SELECT 1 FROM "public"."products"
        WHERE "products"."id" = "product_images"."product_id"
          AND "products"."isPublic" IS TRUE
      )
    );

CREATE POLICY "Admin can insert categories" ON "public"."categories"
    FOR INSERT TO "authenticated" WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can update categories" ON "public"."categories"
    FOR UPDATE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()))
    WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can delete categories" ON "public"."categories"
    FOR DELETE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()));

CREATE POLICY "Admin can insert products" ON "public"."products"
    FOR INSERT TO "authenticated" WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can update products" ON "public"."products"
    FOR UPDATE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()))
    WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can delete products" ON "public"."products"
    FOR DELETE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()));

CREATE POLICY "Admin can insert product categories" ON "public"."product_categories"
    FOR INSERT TO "authenticated" WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can update product categories" ON "public"."product_categories"
    FOR UPDATE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()))
    WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can delete product categories" ON "public"."product_categories"
    FOR DELETE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()));

CREATE POLICY "Admin can insert product tags" ON "public"."product_tags"
    FOR INSERT TO "authenticated" WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can update product tags" ON "public"."product_tags"
    FOR UPDATE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()))
    WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can delete product tags" ON "public"."product_tags"
    FOR DELETE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()));

CREATE POLICY "Admin can insert product images" ON "public"."product_images"
    FOR INSERT TO "authenticated" WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can update product images" ON "public"."product_images"
    FOR UPDATE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()))
    WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can delete product images" ON "public"."product_images"
    FOR DELETE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()));

CREATE POLICY "Admin can insert tags" ON "public"."tags"
    FOR INSERT TO "authenticated" WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can update tags" ON "public"."tags"
    FOR UPDATE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()))
    WITH CHECK ((SELECT "private"."is_cwscales_admin"()));
CREATE POLICY "Admin can delete tags" ON "public"."tags"
    FOR DELETE TO "authenticated" USING ((SELECT "private"."is_cwscales_admin"()));



ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_images" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tags" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

REVOKE ALL ON FUNCTION "public"."get_categories"() FROM PUBLIC, "anon", "authenticated";
REVOKE ALL ON FUNCTION "public"."get_subcategories"("category_name" "text") FROM PUBLIC, "anon", "authenticated";
REVOKE ALL ON FUNCTION "public"."getproductsfromcategory"("categoryname" "text", "subcategories" "text"[], "includesdrafts" boolean) FROM PUBLIC, "anon", "authenticated";
REVOKE ALL ON FUNCTION "public"."search_products"("search_term" "text") FROM PUBLIC, "anon", "authenticated";
REVOKE ALL ON FUNCTION "public"."to_kebab_case"("str" "text") FROM PUBLIC, "anon", "authenticated";

GRANT EXECUTE ON FUNCTION "public"."get_categories"() TO "anon", "authenticated";
GRANT EXECUTE ON FUNCTION "public"."get_subcategories"("category_name" "text") TO "anon", "authenticated";
GRANT EXECUTE ON FUNCTION "public"."getproductsfromcategory"("categoryname" "text", "subcategories" "text"[], "includesdrafts" boolean) TO "anon", "authenticated";
GRANT EXECUTE ON FUNCTION "public"."search_products"("search_term" "text") TO "anon", "authenticated";

GRANT SELECT ON TABLE
  "public"."categories",
  "public"."product_categories",
  "public"."product_images",
  "public"."product_tags",
  "public"."products",
  "public"."tags"
TO "anon", "authenticated";

GRANT INSERT, UPDATE, DELETE ON TABLE
  "public"."categories",
  "public"."product_categories",
  "public"."product_images",
  "public"."product_tags",
  "public"."products",
  "public"."tags"
TO "authenticated";

GRANT ALL ON ALL TABLES IN SCHEMA "public" TO "service_role";
GRANT ALL ON ALL FUNCTIONS IN SCHEMA "public" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
  REVOKE ALL ON TABLES FROM PUBLIC, "anon", "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
  REVOKE ALL ON SEQUENCES FROM PUBLIC, "anon", "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
  REVOKE ALL ON FUNCTIONS FROM PUBLIC, "anon", "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres", "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres", "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres", "service_role";
