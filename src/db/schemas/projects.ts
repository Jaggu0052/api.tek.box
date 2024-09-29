import { pgTable, serial, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';
import userProfileSChema from './user-profile';
const projectsSchema = pgTable('projects', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').unique().notNull(),
  project_name: varchar('project_name').notNull().unique(),
  primary_key: varchar('primary_key'),
  notes: varchar('notes'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  deleted_at: timestamp('deleted_at'),
  created_by: uuid('created_by')
    .notNull()
    .references(() => userProfileSChema.uuid),
  updated_by: uuid('updated_by')
    .notNull()
    .references(() => userProfileSChema.uuid),
});

export default projectsSchema;
