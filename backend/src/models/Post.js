import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["food", "clothes", "medicine", "others"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },

    contactDetails: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
