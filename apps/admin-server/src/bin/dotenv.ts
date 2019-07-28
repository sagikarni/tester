import dotenv from 'dotenv';
import { resolve } from 'path';

let envPath = '.env';

if (
  process.env.DEBUG_ENV &&
  process.env.DEBUG_ENV.length > 0 &&
  process.env.DEBUG_ENV.toLocaleLowerCase() !== 'development'
) {
  envPath = `.${process.env.DEBUG_ENV}.env`;
}

const path = resolve(__dirname, envPath);

console.log(`[dotenv] file path: ${path}`);

dotenv.config({ path });
