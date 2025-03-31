import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    title: String,
    author: String,
    category: String,
    image: String,
    published_date: String,
  },
  { timestamps: true },
);

export const Article = mongoose.model('Article', articleSchema);
