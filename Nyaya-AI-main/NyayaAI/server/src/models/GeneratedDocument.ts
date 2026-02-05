import mongoose, { Document, Schema } from 'mongoose';

export interface IGeneratedDocument extends Document {
  userId?: mongoose.Types.ObjectId;
  documentType: 'police-complaint' | 'fir-draft' | 'rti-application' | 'consumer-complaint';
  title: string;
  formData: Record<string, any>;
  generatedContent: string;
  status: 'draft' | 'final';
  createdAt: Date;
  updatedAt: Date;
}

const generatedDocumentSchema = new Schema<IGeneratedDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    documentType: {
      type: String,
      enum: ['police-complaint', 'fir-draft', 'rti-application', 'consumer-complaint'],
      required: [true, 'Document type is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    formData: {
      type: Schema.Types.Mixed,
      required: true,
    },
    generatedContent: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'final'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

// Index for user's documents
generatedDocumentSchema.index({ userId: 1, createdAt: -1 });
generatedDocumentSchema.index({ documentType: 1 });

export const GeneratedDocument = mongoose.model<IGeneratedDocument>('GeneratedDocument', generatedDocumentSchema);
