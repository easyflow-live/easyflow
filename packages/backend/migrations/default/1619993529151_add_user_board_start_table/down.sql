-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."user_board_stars"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "board_id" uuid NOT NULL, "star" boolean NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("board_id") REFERENCES "public"."boards"("id") ON UPDATE restrict ON DELETE cascade);
