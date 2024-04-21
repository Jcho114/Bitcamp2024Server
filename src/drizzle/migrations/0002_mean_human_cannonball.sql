ALTER TABLE "appointment" RENAME TO "appointmentrequest";--> statement-breakpoint
ALTER TABLE "appointmentrequest" DROP CONSTRAINT "appointment_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointmentrequest" ADD CONSTRAINT "appointmentrequest_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
