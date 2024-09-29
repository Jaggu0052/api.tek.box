import { pgTable, serial, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';
const designationSchema = pgTable('designation', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').unique().notNull(),
  designation: varchar('designation').notNull().unique(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  deleted_at: timestamp('deleted_at'),
});

export default designationSchema;
