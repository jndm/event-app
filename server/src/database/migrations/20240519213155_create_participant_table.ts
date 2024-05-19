import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('participant')
    .addColumn('participant_id', 'serial', (col) => col.primaryKey())
    .addColumn('event_id', 'integer', (col) =>
      col.references('event.event_id').onDelete('cascade').notNull(),
    )
    .addColumn('first_name', 'varchar(200)', (col) => col.notNull())
    .addColumn('last_name', 'varchar(200)', (col) => col.notNull())
    .addColumn('email', 'varchar(200)', (col) => col.notNull())
    .addColumn('phone', 'varchar(20)', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('participant').execute();
}
