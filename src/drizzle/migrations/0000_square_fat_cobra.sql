CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"profilePicture" varchar,
	"hashedPassword" varchar NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
