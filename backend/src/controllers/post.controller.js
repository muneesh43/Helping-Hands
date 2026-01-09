import Post from "../models/Post.js";

// ✅ Create Post (Receiver only)
export const createPost = async (req, res) => {
  try {
    if (req.user.role !== "receiver") {
      return res.status(403).json({ message: "Only receivers can create posts" });
    }

    const post = await Post.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get All Posts (Donor feed)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "name organizationName location");

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Delete Post (Owner only)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
