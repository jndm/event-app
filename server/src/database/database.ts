import { Kysely } from 'kysely';
import { Tables } from './tables/tables';

export interface DatabaseOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export class Database extends Kysely<Tables> {}
