import mongoose from 'mongoose';
const types = {
  orientation: ['horizontal', 'vertical'],
  status: [
    'Started',
    'WaitingForReview',
    'TechnicalWriterPending',
    'TechnicalWriterApproved',
    'Ready',
    'Published',
  ],
  audience: ['Any', 'Kids', 'Elderly'],
  mediaType: ['Photo', 'Video'],
  level: ['Basic', 'Intermediate', 'Advanced'],
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

export const Category = mongoose.model(
  'Category',
  new mongoose.Schema({
    name: { type: String },
  })
);

export const SubCategory = mongoose.model(
  'SubCategory',
  new mongoose.Schema({
    name: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  })
);

export const Domain = mongoose.model(
  'Activity-Domain',
  new mongoose.Schema({
    name: { type: String },
  })
);

export const Type = mongoose.model(
  'Activity-Type',
  new mongoose.Schema({
    name: { type: String },
    domain: { type: mongoose.Types.ObjectId, ref: 'Activity-Domain' },
  })
);

export const Activity = mongoose.model(
  'Activity',
  new mongoose.Schema({
    name: { type: String },
    type: { type: mongoose.Types.ObjectId, ref: 'Activity-Type' },
    description: { type: String },
    free: { type: Boolean },
    printable: { type: Boolean },
    editorial: { type: Boolean },
    level: { type: String, enum: types.level },
    notes: { type: String },
    orientation: { type: String, enum: types.orientation },
    mediaType: { type: String, enum: types.mediaType },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    subCategory: { type: mongoose.Types.ObjectId, ref: 'SubCategory' },
    status: { type: String, enum: types.status },
    audience: { type: String, enum: types.audience },
    model: {
      slideCategories: [String],
      slides: [
        {
          media: [String],
          phrases: [String],
          category: { type: String },
          size: { type: String },
          audio: [String],
          mediaIndex: { type: String },
        },
      ],
    },
  })
);
