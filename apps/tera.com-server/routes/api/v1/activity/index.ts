import { Router } from 'express';

import { authenticate } from 'auth-node';

// import { activitiesMetadata } from '@libs/tera-activities';

const router = Router();

router.get('/:id', (req, res, next) => {
  const activity = {
    name: 'learning-photo',
    title: 'learning photo activity',
    description: 'this is activvity of what in the picture...',
    thumbnails: ['istock-488951890', 'istock-532348674', 'istock-664350152'],
    type: 'plain-slides'
  };

  res.json(activity);
});
export { router as activity };
