import mongoose, { Document, Schema, Model } from "mongoose";

export interface INewsComment {
  user: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface INews extends Document {
  source: mongoose.Types.ObjectId;
  title: string;
  content: string;
  image: string | null;
  category:
    | "Politics"
    | "Sports"
    | "Tech"
    | "Business"
    | "Entertainment"
    | "General";
  like: mongoose.Types.ObjectId[];
  comments: INewsComment[];
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new mongoose.Schema(
  {
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      unique: true,
      maxlength: 100,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: [
        "Politics",
        "Sports",
        "Tech",
        "Business",
        "Entertainment",
        "General",
      ],
      default: "General",
    },

    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const News: Model<INews> = mongoose.model<INews>("News", newsSchema);

export default News;
