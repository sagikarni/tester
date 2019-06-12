const mongoose = require('mongoose');

mongoose.set('debug', true);

//import mongoose, { Document, Schema } from 'mongoose';
const types = {
  orientation: ['Landscape', 'Portrait'],
  status: [
    'Started',
    'WaitingForReview',
    'TechnicalWriterPending',
    'TechnicalWriterApproved',
    'Ready',
    'Published',
  ],
  audience: ['All', 'Kids', 'Elderly'],
  mediaType: ['Photo', 'Video'],
  level: ['Basic', 'Intermediate', 'Advanced'],
  articulationTypes: ['Word', 'Phrase', 'Sentence'],
};

const domains = {
  Learning: ['Plain', 'Facts'],
  Cognition: [
    'WhatsInThePicture',
    'SpotTheDifference',
    'SoundOfLifePhoto',
    'MemoryCards',
    'Commonality',
    'HowToMake',
  ],
  Speech: ['ArticulationWord', 'ArticulationPhrase', 'ArticulationSentense'],
  Communication: ['Meaning', 'WHQuestions', 'GoodStory'],
};

const ActivitySchema = new mongoose.Schema(
  {
    name: { type: String },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity-Type' },
    description: { type: String },
    notes: { type: String },
    level: { type: [String], enum: types.level },
    orientation: { type: String, enum: types.orientation },
    mediaType: { type: String, enum: types.mediaType },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    status: { type: String, enum: types.status },
    audience: { type: String, enum: types.audience },
    free: { type: Boolean, default: false },
    printable: { type: Boolean, default: false },
    editorial: { type: Boolean, default: false },
    isolate: { type: Boolean, default: false },
    metadata: {
      slideCategories: [String],
      slides: [
        {
          media: [{ name: { type: String } }],
          phrases: [String],
          category: { type: String },
          size: { type: String },
          audio: [{ name: { type: String } }],
          mediaIndex: { type: String },
        },
      ],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Activity = mongoose.model('Activity', ActivitySchema);

const ArticulationSchema = new mongoose.Schema(
  {
    name: { type: String },
    display: { type: String },
    title: { type: String },
    description: { type: String },
    notes: { type: String },
    metadata: {
      syllable: [
        {
          text: { type: String },
          type: { type: String, enum: types.articulationTypes },
          emphasis: { type: String },
          location: { type: String },
          syllable: { type: String },
          media: [{ name: { type: String } }],
          isolate: { type: Boolean, default: true },
          audio: [{ name: { type: String } }],
        },
      ],
      blend: [
        {
          text: { type: String },
          type: { type: String, enum: types.articulationTypes },
          blend: { type: String },
          media: [{ name: { type: String } }],
          isolate: { type: Boolean, default: true },
          audio: [{ name: { type: String } }],
        },
      ],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Articulation = mongoose.model('Articulation', ArticulationSchema);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

(async () => {
  await mongoose.connect(
    'mongodb://admin:admin972@18.219.157.139:27017/tera?authSource=admin'
  );

  const n = await Articulation.find({}); // .db.listCollections().toArray();

  await asyncForEach(n, async (x) => {
    // if (x.metadata && x.metadata.slides && x.metadata.slides.media) {
    // for (var i = 0; i < x.metadata.slides.media.length; i++) {
    //   console.log({ n: x.metadata.slides.media[i].name });
    // }

    x.metadata.syllable &&
      x.metadata.syllable.forEach((s) => {
        console.log({ xs: s.type });

        s.media.forEach((m) => {
          console.log(m);
          m.name = m.name.toLocaleLowerCase();
        });
      });

    x.metadata.blend &&
      x.metadata.blend.forEach((s) => {
        console.log({ xs2: s.type });

        s.media.forEach((m) => {
          console.log(m);
          m.name = m.name.toLocaleLowerCase();
        });
      });

    // x.metadata.syllable &&
    // x.metadata.syllable.forEach((s) => {
    //   s.audio && s.audio.forEach((m) => {
    //     console.log(m);
    //     m.name = m.name.toLocaleLowerCase();
    //   });
    // });

    // x.metadata.blend &&
    // x.metadata.blend.forEach((s) => {
    //   s.audio && s.audio.forEach((m) => {
    //     console.log(m);
    //     m.name = m.name.toLocaleLowerCase();
    //   });
    // });

    await x.save();

    // process.exit();
    // }
    // x.

    // await x.save();
  });

  console.log('done');

  // console.log('connected', n);
})();
