import { PostgresDialect } from 'kysely';
import { Database, DatabaseOptions } from './database';
import {
  ConfigurableDatabaseModule,
  DATABASE_OPTIONS,
} from './kysely.module-definitions';
import { Global, Module } from '@nestjs/common';
import * as pg from 'pg';

@Global()
@Module({
  exports: [Database],
  providers: [
    {
      provide: Database,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        const int8TypeId = 20;

        pg.types.setTypeParser(int8TypeId, (val) => {
          return parseInt(val, 10);
        });

        const dialect = new PostgresDialect({
          pool: new pg.Pool({
            host: databaseOptions.host,
            port: databaseOptions.port,
            user: databaseOptions.user,
            password: databaseOptions.password,
            database: databaseOptions.database,
          }),
        });

        return new Database({
          dialect,
        });
      },
    },
  ],
})
export class KyselyModule extends ConfigurableDatabaseModule {}
