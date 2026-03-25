import mongoose, { Document, Schema } from 'mongoose';

export interface ISavedCase extends Document {
  userId: string;
  caseTitle: string;
  notes: string;
  tags: string[];
  court?: string;
  year?: number;
  citation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const savedCaseSchema = new Schema<ISavedCase>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    caseTitle: {
      type: String,
      required: [true, 'Case title is required'],
      trim: true,
      maxlength: [300, 'Case title cannot exceed 300 characters'],
    },
    notes: {
      type: String,
      default: '',
      maxlength: [5000, 'Notes cannot exceed 5000 characters'],
    },
    tags: {
      type: [String],
      default: [],
    },
    court: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    citation: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

savedCaseSchema.index({ userId: 1, createdAt: -1 });
savedCaseSchema.index({ tags: 1 });

export const SavedCase = mongoose.model<ISavedCase>('SavedCase', savedCaseSchema);
