CREATE TABLE IF NOT EXISTS "appointment" (
	"id" uuid NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointment" ADD CONSTRAINT "appointment_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
