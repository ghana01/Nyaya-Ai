import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
  userId: string;
  sessionId: string;
  message: string;
  role: 'user' | 'ai';
  timestamp: Date;
  metadata?: {
    topic?: string;
    language?: string;
  };
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    sessionId: {
      type: String,
      required: [true, 'Session ID is required'],
      index: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [10000, 'Message cannot exceed 10000 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'ai'],
      required: [true, 'Role is required'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      topic: String,
      language: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
chatMessageSchema.index({ userId: 1, sessionId: 1, timestamp: -1 });

export const ChatMessage = mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);
