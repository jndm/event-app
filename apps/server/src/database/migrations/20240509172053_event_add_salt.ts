import { Kysely } from 'kysely';
import * as crypto from 'crypto';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('event')
    .addColumn('salt', 'varchar(200)')
    .execute();

  await db
    .updateTable('event')
    .set('salt', crypto.randomBytes(16).toString('hex'))
    .execute();

  await db.schema
    .alterTable('event')
    .alterColumn('salt', (col) => col.setNotNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('event').dropColumn('salt').execute();
}
