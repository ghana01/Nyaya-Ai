import mongoose, { Document, Schema } from 'mongoose';

export interface IResearchHistory extends Document {
  userId: string;
  query: string;
  summary: string;
  legalPrinciples: string[];
  suggestedArguments: string[];
  similarTopics: string[];
  createdAt: Date;
  updatedAt: Date;
}

const researchHistorySchema = new Schema<IResearchHistory>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    query: {
      type: String,
      required: [true, 'Query is required'],
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
    },
    legalPrinciples: {
      type: [String],
      default: [],
    },
    suggestedArguments: {
      type: [String],
      default: [],
    },
    similarTopics: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

researchHistorySchema.index({ userId: 1, createdAt: -1 });

export const ResearchHistory = mongoose.model<IResearchHistory>('ResearchHistory', researchHistorySchema);
