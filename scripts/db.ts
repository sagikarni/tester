import { connect, connection } from 'mongoose';
import * as dotenv from 'dotenv';
import * as pathy from 'path';

let path = pathy.resolve(__dirname, '../apps/tera.com-server/.env');

dotenv.config({ path });

const { MONGODB_URI, SERVER_PORT } = process.env;

import { Plan } from '../packages/cognishine/src/mongodb/plan';
import { Activity } from '../packages/cognishine/src/mongodb/activity';
import { SubCategory } from '../packages/cognishine/src/mongodb/subcategory';

import { uniq } from 'lodash';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

(async () => {
  connection.once('open', async () => {
    console.log('Connection database has been established successfully.');

    // await db.connection.db.dropDatabase();

    // const x = await Plan.find();

    const x = await Activity.find();

    var u = {};

    x.forEach((xx: any) => {
      const type = xx.type.toString();
      const sub = xx.subCategory;
      u[sub] = u[sub] || [];
      if (u[sub].indexOf(type) === -1) u[sub] = u[sub].concat(type);
    });

    // console.log({ u });
    await asyncForEach(Object.keys(u), async (uu) => {
      // const ii = u[uu].filter((item,index,self) => self.indexOf(item)==index);

      // console.log({ i: u[uu] });
      const s = await SubCategory.findById(uu);

      if (s) {
        s.types = u[uu];
        console.log({ s });

        await s.save();
      }

      // console.log({ s });
      // process.exit();
    });
    console.log('done');
    // console.log({ x });
  });

  await connect(MONGODB_URI);
})();
