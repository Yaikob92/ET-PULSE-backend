import mongoose, { Document, Schema, Model } from "mongoose";

export interface INotification extends Document {
  from: mongoose.Types.ObjectId | null; // default is null
  to: mongoose.Types.ObjectId;
  type: "news_update" | "breaking_news";
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
      required: true,
      default: null,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cateogry: {
      type: String,
      required: true,
      enum: ["news_update", "breaking_news"],
      default: "news_update",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification: Model<INotification> = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
