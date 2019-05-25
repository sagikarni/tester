import dotenv from 'dotenv';

let path = '.env';

if (
  process.env.DEBUG_ENV &&
  process.env.DEBUG_ENV.length > 0 &&
  process.env.DEBUG_ENV.toLocaleLowerCase() !== 'development'
) {
  path = `.${process.env.DEBUG_ENV}.env`;
}

console.log(`[dotenv] file path: ${path}`);

dotenv.config({ path });
