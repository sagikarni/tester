import { Router } from 'express';
import { Activity, SubCategory, Category, Type, Domain } from './models';

const router = Router();

router.get('/activities', async (req, res, next) => {
  const activities = await Activity.find({})
    .populate('category')
    .populate('subCategory')
    .populate({
      //    'type'
      path: 'type',
      populate: {
        path: 'domain',
        // model: 'Domain',
      },
    });

  res.json({ activities, code: 20000 });
});

router.get('/activities/:id', async (req, res, next) => {
  const activity = await Activity.findById(req.params.id)
    .populate('category')
    .populate('subCategory')
    .populate('type');

  res.json({ activity, code: 20000 });
});

router.get('/categories', async (req, res, next) => {
  // const categories = await Category.find({});
  const categories = await Category.aggregate([
    // stage 1: join subcategories
    {
      $lookup: {
        from: 'subcategories', // collection to join
        localField: '_id', // field from categories collection
        foreignField: 'category', // field from subcategories collection
        as: 'subcategory',
      },
    },
  ]);

  res.json({ categories, code: 20000 });
});

router.get('/domains', async (req, res, next) => {
  // const types = await Type.find({})
  // .populate('domain');

  const domains = await Domain.aggregate([
    // stage 1: join subcategories
    {
      $lookup: {
        from: 'activity-types', // collection to join
        localField: '_id', // field from categories collection
        foreignField: 'domain', // field from subcategories collection
        as: 'types',
      },
    },
  ]);

  res.json({ domains, code: 20000 });
});

router.post('/activities/:id', async (req, res, next) => {
  // const categories = await Category.find({});
  const d = req.params.id;

  console.log('***id: ', d);
  console.log('***activity: ', req.body.activity);

  var up = null;

  if (d && d !== 'add') {
    up = await Activity.findOneAndUpdate({ _id: d }, req.body.activity, {
      upsert: true,
      new: true,
    });
  } else {
    up = await Activity.insertMany([req.body.activity]);
  }

  console.log({ up });

  res.json({ up, code: 20000 });
});

router.delete('/activities/:id', async (req, res, next) => {
  const activity = await Activity.findByIdAndRemove(req.params.id);
console.log('in del');
  console.log({ activity });
  res.json({ activity, code: 20000 });


});

export { router as v1 };
