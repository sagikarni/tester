import { Router } from 'express';

// import { authenticate } from "@libs/auth-node";

// import { activitiesMetadata } from '@libs/tera-activities';

const router = Router();

router.get('/', (req, res, next) => {
  // console.log('activitiesMetadata', activitiesMetadata);

  // res.json(activitiesMetadata['single-photo']);
});

export { router as activity };
