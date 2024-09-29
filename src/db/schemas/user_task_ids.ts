import { pgTable, serial, timestamp, uuid } from 'drizzle-orm/pg-core';
import userProfileSChema from './user-profile';
import tasksSchema from './tasks';
const taskUserIdsSchema = pgTable('task_user_ids', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').unique().notNull(),
  task_id: uuid('task_id')
    .references(() => tasksSchema.uuid)
    .notNull(),
  user_id: uuid('user_id')
    .references(() => userProfileSChema.uuid)
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

export default taskUserIdsSchema;
