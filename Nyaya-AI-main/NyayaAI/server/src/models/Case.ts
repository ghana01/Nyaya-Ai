import mongoose, { Document, Schema } from 'mongoose';

export interface ICase extends Document {
  title: string;
  court: 'Supreme Court' | 'High Court' | 'District Court' | 'Tribunal';
  year: number;
  summary: string;
  judgement: string;
  legalPrinciples: string[];
  tags: string[];
  citation?: string;
  source: 'local' | 'external';
  link?: string;
}

const caseSchema = new Schema<ICase>(
  {
    title: {
      type: String,
      required: [true, 'Case title is required'],
      trim: true,
      index: true,
    },
    court: {
      type: String,
      enum: ['Supreme Court', 'High Court', 'District Court', 'Tribunal'],
      required: [true, 'Court name is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: 1947,
      max: new Date().getFullYear(),
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
    },
    judgement: {
      type: String,
      required: [true, 'Judgement is required'],
    },
    legalPrinciples: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    citation: {
      type: String,
    },
    source: {
      type: String,
      enum: ['local', 'external'],
      default: 'local',
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for full-text search
caseSchema.index({ title: 'text', summary: 'text', tags: 'text' });

export const Case = mongoose.model<ICase>('Case', caseSchema);
