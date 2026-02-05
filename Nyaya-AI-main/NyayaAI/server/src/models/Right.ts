import mongoose, { Document, Schema } from 'mongoose';

export interface IRight extends Document {
  title: string;
  category: 'women' | 'cybercrime' | 'arrest' | 'consumer' | 'tenant';
  description: string;
  lawReference: string;
  icon?: string;
  keyPoints: string[];
  relatedLaws: string[];
  helplineNumbers?: { name: string; number: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const rightSchema = new Schema<IRight>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    category: {
      type: String,
      enum: ['women', 'cybercrime', 'arrest', 'consumer', 'tenant'],
      required: [true, 'Category is required'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    lawReference: {
      type: String,
      required: [true, 'Law reference is required'],
    },
    icon: {
      type: String,
      default: '⚖️',
    },
    keyPoints: [{
      type: String,
    }],
    relatedLaws: [{
      type: String,
    }],
    helplineNumbers: [{
      name: String,
      number: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Index for text search
rightSchema.index({ title: 'text', description: 'text' });

export const Right = mongoose.model<IRight>('Right', rightSchema);
