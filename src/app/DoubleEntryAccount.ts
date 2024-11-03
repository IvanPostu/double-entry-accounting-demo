import fs from 'fs';
import path from 'path';
import os from 'os';
import { Database, verbose as createSqliteDbVerbose } from 'sqlite3';

const sqlite3 = createSqliteDbVerbose();
const dbMigrationsDirectoryPath = path.resolve(__dirname, 'db_migrations');

export class DoubleEntryAccount {
  private readonly db: Database;

  private constructor(db: Database) {
    this.db = db;
  }

  public static async create(): Promise<DoubleEntryAccount> {
    const db: Database = await createAndMigrateDb();
    const instance = new DoubleEntryAccount(db);
    return instance;
  }

  public close(): void {
    this.db.close((err) => {
      if (err) {
        throw new Error('Error closing database:' + err.message);
      } else {
        throw new Error('Database connection closed.');
      }
    });
  }

  public someMethod(): void {
    console.log('Method called!');
    console.log(getDbMigrationQueries(dbMigrationsDirectoryPath));
  }
}

async function createAndMigrateDb(): Promise<Database> {
  const nowAsMilliseconds = new Date().getTime();
  const tempDir = path.join(os.tmpdir(), 'mytempdb' + nowAsMilliseconds);
  const dbFile = path.join(tempDir, 'database.sqlite');
  fs.mkdirSync(tempDir, { recursive: true });
  const db = await connectToDb(dbFile);

  const migrationQueries: Array<MigrationQuery> = getDbMigrationQueries(dbMigrationsDirectoryPath);

  for (const queryEntry of migrationQueries) {
    executeQuery(db, queryEntry.query);
    console.log(`Successfully migrated: ${queryEntry.migrationFilename}`);
  }

  return db;
}

async function connectToDb(dbFile: string): Promise<Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFile, (err) => {
      if (err) {
        reject(new Error('Error opening database:' + err.message));
      }
    });
    resolve(db);
  });
}

async function executeQuery(db: Database, query: string): Promise<1> {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) {
        reject(new Error('Error creating table:' + err.message));
      } else {
        resolve(1);
      }
    });
  });
}

function getDbMigrationQueries(directoryPath): Array<MigrationQuery> {
  function getIndexByFilename(filename: string): number {
    const groups = filename.match(/(\d+)_/);
    const strIndex = groups && groups.length > 0 ? groups[1] : '-1';
    return parseInt(strIndex) || -1;
  }

  try {
    const files = fs.readdirSync(directoryPath);

    const sortedFiles = files
      .filter((file) => /^\d+_.*\.sql$/.test(file))
      .sort((a, b) => {
        const numA = getIndexByFilename(a);
        const numB = getIndexByFilename(b);
        return numA > numB ? 1 : numA < numB ? -1 : 0;
      });

    const result = sortedFiles.map((filename) => {
      const query = fs.readFileSync(path.resolve(directoryPath, filename), 'utf8');
      const element: MigrationQuery = {
        migrationFilename: filename,
        query
      };
      return element;
    });
    return result;
  } catch (err) {
    throw new Error('Unable to scan directory: ' + err);
  }
}

type MigrationQuery = {
  migrationFilename: string;
  query: string;
};
