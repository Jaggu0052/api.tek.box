CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" varchar,
	"comments" varchar,
	"uuid" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	CONSTRAINT "comments_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "designation" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"designation" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "designation_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "designation_designation_unique" UNIQUE("designation")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"project_name" varchar NOT NULL,
	"primary_key" varchar,
	"notes" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	CONSTRAINT "projects_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "projects_project_name_unique" UNIQUE("project_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"heading" varchar NOT NULL,
	"type" varchar,
	"priority" varchar NOT NULL,
	"status" varchar NOT NULL,
	"project_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	CONSTRAINT "tasks_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_project_ids" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	CONSTRAINT "user_project_ids_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_user_ids" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	CONSTRAINT "task_user_ids_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"id" serial NOT NULL,
	"uuid" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"employee_id" varchar,
	"primary_email" varchar,
	"designation_id" uuid,
	"image_url" varchar,
	"secondary_email" varchar,
	"primary_phone_number" varchar NOT NULL,
	"secondary_phone_number" varchar,
	"status" varchar NOT NULL,
	"user_type" varchar NOT NULL,
	"access_token" varchar,
	"tokens" varchar,
	"login_count" integer,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "user_profile_id_unique" UNIQUE("id"),
	CONSTRAINT "user_profile_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "user_profile_username_unique" UNIQUE("username"),
	CONSTRAINT "user_profile_primary_email_unique" UNIQUE("primary_email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_task_id_tasks_uuid_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_created_by_user_profile_uuid_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_updated_by_user_profile_uuid_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_user_profile_uuid_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_updated_by_user_profile_uuid_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_uuid_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_user_profile_uuid_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_updated_by_user_profile_uuid_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_project_ids" ADD CONSTRAINT "user_project_ids_user_id_user_profile_uuid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_project_ids" ADD CONSTRAINT "user_project_ids_project_id_projects_uuid_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_project_ids" ADD CONSTRAINT "user_project_ids_created_by_user_profile_uuid_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_project_ids" ADD CONSTRAINT "user_project_ids_updated_by_user_profile_uuid_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_user_ids" ADD CONSTRAINT "task_user_ids_task_id_tasks_uuid_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_user_ids" ADD CONSTRAINT "task_user_ids_user_id_user_profile_uuid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_user_ids" ADD CONSTRAINT "task_user_ids_created_by_user_profile_uuid_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_user_ids" ADD CONSTRAINT "task_user_ids_updated_by_user_profile_uuid_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_designation_id_designation_uuid_fk" FOREIGN KEY ("designation_id") REFERENCES "public"."designation"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_created_by_user_profile_uuid_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_updated_by_user_profile_uuid_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user_profile"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
