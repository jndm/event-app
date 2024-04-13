import { PostgresDialect } from 'kysely';
import { Database, DatabaseOptions } from './database';
import {
  ConfigurableDatabaseModule,
  DATABASE_OPTIONS,
} from './kysely.module-definitions';
import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  exports: [Database],
  providers: [
    {
      provide: Database,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        console.log('jees');
        console.log(databaseOptions);

        const dialect = new PostgresDialect({
          pool: new Pool({
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
