import Comment from "../model/Comment.model.js";

export const getComment = async (req, res) => {
  const postId = req.params.id;
  try {
    const comment = await Comment.find({ product: postId })
      .populate("user", "name image lastname")
      .sort({ createdAt: -1 });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createComment = async (req, res) => {
  const postId = req.params.id;
  try {
    const user = await Comment.findOne({ user: req.user._id, product: postId });
    if (user) {
      return res.status(400).json({ message: "You already commented" });
    }
    if (!req.body) {
      return res.status(400).json({ message: "Comment is required" });
    }
    const comment = new Comment({
      ...req.body,
      user: req.user._id,
      product: postId,
    });
    const result = await comment.save();

    res.status(201).json({ message: "Comment created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" + error });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
