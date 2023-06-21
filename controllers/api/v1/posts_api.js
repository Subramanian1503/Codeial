const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

// Method to get all the posts from DB
module.exports.getAll = async (request, response) => {
  //Getting all the posts created from DB
  const posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return response.json(200, {
    message: "Get all posts success",
    posts: posts,
  });
};

// Method to delete post from DB
module.exports.delete = async (request, response) => {
  try {
    // Getting the post identifier to delete from DB
    const postId = request.params.id;

    // Find the post by its identifier
    const post = await Post.findById(postId);

    // If available, Delete the post
    await Post.findByIdAndRemove(postId);

    // Delete the comments of that post as well
    await Comment.deleteMany({
      post: postId,
    });

    // return status code and delete successfull message
    return response.status(200).json({
      message: `Post with id: ${postId} deleted successfully`,
    });

  } catch (error) {
    console.log(`Error while trying to delete comments :${error}`);
    return response.status(500).json({
      message: `Internal server error`,
    });
  }
};