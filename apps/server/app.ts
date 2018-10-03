import { json, urlencoded } from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as sessionExpress from "express-session";
import * as helmet from "helmet";
import * as methodOverride from "method-override";
import * as path from "path";

import { clientErrorHandler, errorHandler } from "@libs/express-zone";
import { routes } from "./routes";

import {
  facebookStrategy,
  googleStrategy,
  linkedinStrategy,
  twitterStrategy,
} from "@libs/auth-node";
import { initialize, session, use } from "passport";

use(facebookStrategy);
use(twitterStrategy);
use(linkedinStrategy);
use(googleStrategy);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

app.use(helmet());

app.use(sessionExpress({ secret: "SECRET" }));
app.use(initialize());
app.use(session());

app.use(routes);

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
