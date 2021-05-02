CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."roles"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "name" varchar NOT NULL, PRIMARY KEY ("id") , UNIQUE ("name"));

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."user_role"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "role_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON UPDATE restrict ON DELETE cascade);
