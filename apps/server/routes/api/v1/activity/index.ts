import { Router } from "express";

// import { authenticate } from "@libs/auth-node";

import { activity1 } from "@libs/tera-activities";

const router = Router();

router.get("/", (req, res, next) => {
  res.json(activity1);
});

export { router as activity };
