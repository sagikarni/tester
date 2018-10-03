import * as cors from "cors";
import { Router } from "express";
import { api } from "./api";
import { auth } from "./auth";

const router = Router();

router.use("/api", cors(), api);

router.use("/auth", auth);

export { router as routes };
