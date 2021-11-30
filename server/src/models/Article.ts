import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  message: String,
  name: String,
  author: String,
  url: String,
  tags: [String],
  totalReviewsCount: {
    type: Number,
    default: 0,
  },
  totalRates: [Number],
  averageRate: {
    type: Number,
    default: 0,
  },
  reviewed: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
