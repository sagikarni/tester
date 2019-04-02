import { Router } from 'express';
import {
  Activity,
  SubCategory,
  Category,
  Type,
  Domain,
  ActivityCollection,
  Articulation,
} from './models';
import { values, groupBy, entries, toPairs } from 'lodash';
const router = Router();

router.get('/articulations', async (req, res, next) => {
  const articulations = await Articulation.find({});

  res.json({ articulations, code: 20000 });
});

router.get('/articulations/:id', async (req, res, next) => {
  const articulation = await Articulation.findById(req.params.id);

  res.json({ articulation, code: 20000 });
});

router.get('/activities', async (req, res, next) => {
  const activities = await Activity.find({})
    .populate('category')
    .populate('subCategory')
    .populate({ path: 'type', populate: { path: 'domain' } });

  res.json({ activities, code: 20000 });
});

router.get('/activities/:id', async (req, res, next) => {
  const activity = await Activity.findById(req.params.id)
    .populate('category')
    .populate('subCategory')
    .populate({ path: 'type', populate: { path: 'domain' } });

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

router.post('/categories', async (req, res, next) => {
  const category = (req as any).body.category;

  console.log({ category });

  await new Category({ name: category }).save();

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

router.post('/categories/sub', async (req, res, next) => {
  const name = (req as any).body.name;
  const category = (req as any).body.category;

  console.log({ category });

  const cat = await Category.findOne({ name: category });

  await new SubCategory({ name, category: cat }).save();

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

router.delete('/categories/sub', async (req, res, next) => {
  const name = (req as any).body.name;

  console.log({ name });

  await SubCategory.findOneAndRemove({ name });

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

router.delete('/categories', async (req, res, next) => {
  const name = (req as any).body.name;

  console.log({ name });

  await Category.findOneAndRemove({ name });

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
  const types = await Type.find({}).populate('domain');

  const domains = groupBy(types, 'domain.name') as any;

  res.json({ domains, code: 20000 });
});

router.post('/activities', async (req, res, next) => {
  // const categories = await Category.find({});

  console.log('***create or update activity: ', req.body.activity);

  const activity = await Activity.findOneAndUpdate(
    { _id: req.body.activity._id },
    req.body.activity,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  )
    .populate('category')
    .populate('subCategory')
    .populate({ path: 'type', populate: { path: 'domain' } });

  // if (d && d !== 'add') {
  //   up = await Activity.findOneAndUpdate({ _id: d }, req.body.activity, {
  //     upsert: true,
  //     new: true,
  //   });
  // } else {
  //   up = await Activity.insertMany([req.body.activity]);
  // }

  // const activities = await Activity.findOne({ _id: up })
  //   .populate('category')
  //   .populate('subCategory')
  //   .populate({ path: 'type', populate: { path: 'domain' } });

  // console.log({ up });

  res.json({ activity, code: 20000 });
});

router.post('/articulations', async (req, res, next) => {
  // const categories = await Category.find({});

  console.log('***create or update articulation: ', req.body.articulation);

  const articulation = await Articulation.findOneAndUpdate(
    { _id: req.body.articulation._id },
    req.body.articulation,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
  // .populate('category')
  // .populate('subCategory')
  // .populate({ path: 'type', populate: { path: 'domain' } });

  // if (d && d !== 'add') {
  //   up = await Activity.findOneAndUpdate({ _id: d }, req.body.activity, {
  //     upsert: true,
  //     new: true,
  //   });
  // } else {
  //   up = await Activity.insertMany([req.body.activity]);
  // }

  // const activities = await Activity.findOne({ _id: up })
  //   .populate('category')
  //   .populate('subCategory')
  //   .populate({ path: 'type', populate: { path: 'domain' } });

  // console.log({ up });

  res.json({ articulation, code: 20000 });
});

router.delete('/activities/:id', async (req, res, next) => {
  const activity = await Activity.findByIdAndRemove(req.params.id);
  console.log('in del');
  console.log({ activity });
  res.json({ activity, code: 20000 });
});

router.post('/collection', async (req, res, next) => {
  const collectionsReq = (req as any).body.collections;

  console.log({ collectionsReq });

  for (const col of collectionsReq) {
    console.log({ col });
    if (col._id) {
      const activity = await ActivityCollection.findOneAndUpdate(
        { _id: col._id },
        col,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    } else {
      await ActivityCollection.insertMany([col]);
    }
  }
  console.log('done');
  // await ActivityCollection.insertMany(collectionsReq);
  // await ActivityCollection.findOneAndUpdate(collectionsReq, { });

  const collections = await ActivityCollection.find({});

  console.log({ collections });
  res.json({ collections, code: 20000 });
});

router.get('/collections', async (req, res, next) => {
  const collections = await ActivityCollection.find({});

  console.log({ collections });
  res.json({ collections, code: 20000 });
});

export { router as v1 };
