
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."users" add column "email_verified" timestamptz
 null;


-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."boards" add column "name" varchar
 not null;

DROP TABLE "public"."boards";

alter table "public"."sessions" drop constraint "sessions_user_id_fkey";

DROP TABLE "public"."sessions";

DROP TABLE "public"."verification_requests";

DROP TABLE "public"."users";
