import mongoose, { Document, Schema } from 'mongoose';

export type ActivityType = 'chat' | 'case_search' | 'law_read';

export interface IUserActivity extends Document {
  userId: string;
  type: ActivityType;
  query: string;
  response: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const userActivitySchema = new Schema<IUserActivity>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['chat', 'case_search', 'law_read'],
      required: [true, 'Activity type is required'],
      index: true,
    },
    query: {
      type: String,
      required: [true, 'Query is required'],
      maxlength: [5000, 'Query cannot exceed 5000 characters'],
    },
    response: {
      type: String,
      required: [true, 'Response is required'],
      maxlength: [20000, 'Response cannot exceed 20000 characters'],
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient user activity queries
userActivitySchema.index({ userId: 1, type: 1, createdAt: -1 });

export const UserActivity = mongoose.model<IUserActivity>('UserActivity', userActivitySchema);
