import "./polyfills";

import { db } from "@libs/auth-node";
import { logger } from "@libs/express-zone";
import { createServer } from "http";

import app from "@server/app";

const PORT = process.env.PORT || 3000;

(async () => {
  db.connection.once("open", async () => {
    console.log("Connection database has been established successfully.");

    // await db.connection.db.dropDatabase();

    const server = createServer(app);

    server.listen(process.env.PORT || 3000, function() {
      console.log("app listening on port 3000!");
    });
  });

  await db.connect();
})();
