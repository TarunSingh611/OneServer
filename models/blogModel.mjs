// models/Blog.js
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true, },
  content: { type: String, required: true, },
  author: { type: String, required: true, },
  createdAt: { type: Date, default: Date.now, },
  updatedAt: { type: Date, default: Date.now, },
  link : { type: String, required: true, },
  likes : { type: Number, default: 0, },
  dislikes : { type: Number, default: 0, },
});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
