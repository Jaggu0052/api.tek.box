import {
  foreignKey,
  integer,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import designationSchema from './designation';
const userProfileSChema = pgTable(
  'user_profile',
  {
    id: serial('id').unique(),
    uuid: uuid('uuid').primaryKey().unique().notNull(),
    first_name: varchar('first_name').notNull(),
    last_name: varchar('last_name'),
    username: varchar('username').notNull().unique(),
    password: varchar('password').notNull(),
    employee_id: varchar('employee_id'),
    primary_email: varchar('primary_email').unique(),
    designation_id: uuid('designation_id').references(
      () => designationSchema.uuid,
    ),
    image_url: varchar('image_url'),
    secondary_email: varchar('secondary_email'),
    primary_phone_number: varchar('primary_phone_number').notNull(),
    secondary_phone_number: varchar('secondary_phone_number'),
    status: varchar('status', {
      enum: ['ACTIVE', 'INACTIVE'],
    }).notNull(),
    user_type: varchar('user_type', {
      enum: ['ADMIN', 'MANAGER', 'TEAMLEAD', 'EMPLOYEE'],
    }).notNull(),
    access_token: varchar('access_token'),
    tokens: varchar('tokens'),
    login_count: integer('login_count'),
    created_by: uuid('created_by').notNull(),
    updated_by: uuid('updated_by').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    deleted_at: timestamp('deleted_at'),
  },
  (table) => {
    return {
      createdByFK: foreignKey({
        columns: [table.created_by],
        foreignColumns: [table.uuid],
      }),
      updatedByFK: foreignKey({
        columns: [table.updated_by],
        foreignColumns: [table.uuid],
      }),
    };
  },
);

export type SelectUser = typeof userProfileSChema.$inferSelect;
export type InsertUser = typeof userProfileSChema.$inferInsert;
export default userProfileSChema;
