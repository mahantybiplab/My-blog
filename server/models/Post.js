import mongoose from "mongoose";

const schema = mongoose.Schema;

const postSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema)
export default Post;