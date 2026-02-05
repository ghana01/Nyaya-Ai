import mongoose, { Document, Schema } from 'mongoose';

export interface ILaw extends Document {
  actName: string;
  actShortName?: string;
  section: string;
  title: string;
  explanation: string;
  punishment?: string;
  keywords: string[];
  category?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const lawSchema = new Schema<ILaw>(
  {
    actName: {
      type: String,
      required: [true, 'Act name is required'],
      trim: true,
      index: true,
    },
    actShortName: {
      type: String,
      trim: true,
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    explanation: {
      type: String,
      required: [true, 'Explanation is required'],
    },
    punishment: {
      type: String,
      default: '',
    },
    keywords: [{
      type: String,
      lowercase: true,
    }],
    category: {
      type: String,
      enum: ['criminal', 'civil', 'constitutional', 'property', 'family', 'cyber', 'consumer', 'labor'],
      default: 'criminal',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
lawSchema.index({ 
  actName: 'text', 
  title: 'text', 
  explanation: 'text', 
  section: 'text',
  keywords: 'text' 
});

// Compound index for act grouping
lawSchema.index({ actName: 1, section: 1 });

export const Law = mongoose.model<ILaw>('Law', lawSchema);
