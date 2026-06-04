DO $$ BEGIN
 ALTER TABLE "entries" ADD CONSTRAINT "entries_user_id_date_unique" UNIQUE("user_id","date");
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
