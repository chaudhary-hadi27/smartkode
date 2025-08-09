import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
