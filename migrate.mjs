import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

await migrate(db, { migrationsFolder: join(__dirname, 'drizzle') });
await client.end();
console.log('migrations applied');
