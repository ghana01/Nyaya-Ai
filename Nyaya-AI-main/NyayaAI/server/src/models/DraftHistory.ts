import mongoose, { Document, Schema } from 'mongoose';

export interface IDraftHistory extends Document {
  userId: string;
  type: string;
  title: string;
  formData: Record<string, any>;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const draftHistorySchema = new Schema<IDraftHistory>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    type: {
      type: String,
      required: [true, 'Draft type is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    formData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    content: {
      type: String,
      required: [true, 'Generated content is required'],
    },
  },
  {
    timestamps: true,
  }
);

draftHistorySchema.index({ userId: 1, createdAt: -1 });

export const DraftHistory = mongoose.model<IDraftHistory>('DraftHistory', draftHistorySchema);
