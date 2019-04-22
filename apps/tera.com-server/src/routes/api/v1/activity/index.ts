import { Router } from 'express';

import { authenticate } from 'auth-node';

// import { activitiesMetadata } from '@libs/tera-activities';
import {
  ActivityCollection,
  Articulation,
  ActivityType,
  Activity
} from '../../../../models';

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

router.get('/collection/:group', async (req, res, next) => {
  const group = req.params.group;

  const activityCollection = await ActivityCollection.find({
    name: group,
  }).populate({
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

router.get('/articulations', async (req, res, next) => {
  const articulations = await Articulation.find({});

  res.json({ articulations, code: 20000 });
});

router.get('/types/:domain', async (req, res, next) => {
  const domain = req.params.domain;
  console.log({ domain });

  let types = await ActivityType.find({}).populate('domain'); // One({ category: {name: domain} });

  types = types.filter(t => t.domain.name.toLocaleLowerCase() === domain);

  res.json({ types, code: 20000 });
});


router.get('/activities/:category', async (req, res, next) => {
  const category = req.params.category;

  let activities = await Activity.find({})
  .populate('category')
  .populate('subCategory')
  .populate({ path: 'type', populate: { path: 'domain' } });

  activities = activities.filter(a => a.type.name.toLocaleLowerCase() === category.toLocaleLowerCase());

  res.json({ activities, code: 20000 });
});


export { router as activity };
