import mongoose from 'mongoose';
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
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
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
    domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity-Domain' },
  })
);

export const ActivityCollection = mongoose.model(
  'Activity-Collection',
  new mongoose.Schema({
    name: { type: String },
    items: [
      {
        name: { type: String },
        activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
      },
    ],
  })
);

export const Activity = mongoose.model(
  'Activity',
  new mongoose.Schema(
    {
      name: { type: String },
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity-Type' },
      description: { type: String },
      free: { type: Boolean },
      printable: { type: Boolean },
      editorial: { type: Boolean },
      level: { type: [String], enum: types.level },
      notes: { type: String },
      orientation: { type: String, enum: types.orientation },
      mediaType: { type: String, enum: types.mediaType },
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
      status: { type: String, enum: types.status },
      audience: { type: String, enum: types.audience },
      isolate: { type: Boolean },
      model: {
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
  )
);
