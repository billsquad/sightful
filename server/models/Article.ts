import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  message: String,
  create: String,
  tags: [String],
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
