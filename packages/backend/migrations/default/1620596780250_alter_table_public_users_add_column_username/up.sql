alter table "public"."users" add column "username" varchar
 null;
 alter table "public"."users" add constraint "users_username_key" unique (username);
