ALTER TABLE "appointmentrequest" DROP CONSTRAINT "appointmentrequest_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "appointmentrequest" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "appointmentrequest" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "appointmentrequest" ADD COLUMN "studentId" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointmentrequest" ADD CONSTRAINT "appointmentrequest_studentId_user_id_fk" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
