import { Router } from 'express';

import { authenticate } from 'auth-node';

// import { activitiesMetadata } from '@libs/tera-activities';
import { ActivityCollection } from '../../../../models';

const router = Router();

// router.get('/:id', (req, res, next) => {
//   const activity = {
//     name: 'learning-photo',
//     title: 'learning photo activity',
//     description: 'this is activvity of what in the picture...',
//     thumbnails: ['istock-488951890', 'istock-532348674', 'istock-664350152'],
//     type: 'plain-slides',
//   };

//   res.json(activity);
// });

router.get('/collection', async (req, res, next) => {
  const activityCollection = await ActivityCollection.find({}).populate({
    path: 'items.activities',
    populate: [
      {
        path: 'type',
        model: 'Activity-Type',
        populate: { path: 'domain' },
      },
      // { path: 'domain', model: 'Activity-Domain' },
      // { path: 'category', model: 'Category' },
      // { path: 'subCategory', model: 'SubCategory' },
    ],
  });

  res.json({ activityCollection });
});

export { router as activity };
