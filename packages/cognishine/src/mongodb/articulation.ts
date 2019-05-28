import mongoose, { Document, Schema } from 'mongoose';
import { types } from './types';

export interface IArticulation {
  name: string;
  display: string;
  title: string;
  description: string;
  notes: string;
  metadata: {
    syllable: [
      {
        text: string;
        type: any;
        emphasis: string;
        location: string;
        syllable: string;
        media: [{ name: { type: string } }];
        isolate: { type: boolean };
        audio: [{ name: { type: string } }];
      }
    ];
    blend: [
      {
        text: string;
        type: any;
        blend: string;
        media: [{ name: { type: string } }];
        isolate: { type: boolean };
        audio: [{ name: { type: string } }];
      }
    ];
  };
}

export interface IMongooseArticulation extends IArticulation, Document {}

const ArticulationSchema = new Schema(
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

export const Articulation = mongoose.model<IMongooseArticulation>(
  'Articulation',
  ArticulationSchema
);
