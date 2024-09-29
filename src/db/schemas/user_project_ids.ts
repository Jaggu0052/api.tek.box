import { pgTable, serial, timestamp, uuid } from 'drizzle-orm/pg-core';
import userProfileSChema from './user-profile';
import projectsSchema from './projects';
const userProjectIdsSchema = pgTable('user_project_ids', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').unique().notNull(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => userProfileSChema.uuid),
  project_id: uuid('project_id')
    .notNull()
    .references(() => projectsSchema.uuid),
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

export default userProjectIdsSchema;
