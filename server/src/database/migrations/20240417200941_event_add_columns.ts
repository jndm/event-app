import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('event')
    .addColumn('event_start', 'timestamptz', (col) => col.notNull())
    .addColumn('event_end', 'timestamptz')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updated_at', 'timestamptz')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('event')
    .dropColumn('event_start')
    .dropColumn('event_end')
    .dropColumn('created_at')
    .dropColumn('updated_at')
    .execute();
}
