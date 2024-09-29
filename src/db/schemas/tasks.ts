import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import userProfileSChema from './user-profile';
import projectsSchema from './projects';
const tasksSchema = pgTable('tasks', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').unique().notNull(),
  heading: varchar('heading').notNull(),
  type: varchar('type'),
  priority: varchar('priority', {
    enum: ['1', '2', '3', '4'],
  }).notNull(),
  status: varchar('status', {
    enum: ['ACTIVE', 'INACTIVE', 'IN-PROGRESS', 'COMPLETED'],
  }).notNull(),
  project_id: uuid('project_id').references(() => projectsSchema.uuid),
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

export default tasksSchema;
