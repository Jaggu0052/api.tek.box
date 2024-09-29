import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import userProfileSChema from './user-profile';
import tasksSchema from './tasks';
const commentsSchema = pgTable('comments', {
  id: serial('id').primaryKey(),
  image_url: varchar('image_url'),
  comments: varchar('comments'),
  uuid: uuid('uuid').unique().notNull(),
  task_id: uuid('task_id')
    .references(() => tasksSchema.uuid)
    .notNull(),
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

export default commentsSchema;
