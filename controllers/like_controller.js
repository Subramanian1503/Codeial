const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

// Method to toggle like
module.exports.toggle = async (request, response) => {
  try {
    // Get the input informations from query param
    const likeableId = request.query.id;
    const likedOn = request.query.type;
    const user = request.user;

    let likedEntity;
    let deletedStatus = false;

    // Get the likeable entity
    if (likedOn === "Post") {
      likedEntity = await Post.findById(likeableId);
    } else {
      likedEntity = await Comment.findById(likeableId);
    }

    // Check if the like for the entity already exists
    const like = await Like.findOne({
      user: user,
      onModel: likedOn,
      likeable: likeableId,
    });

    // If yes delete the like from DB and from entity
    if (like) {
      // Remove like Id from entity
      likedEntity.likes.pull(like._id);
      
      likedEntity.save();

      // Delete the like from DB
      await Like.findByIdAndRemove(like._id);

      deletedStatus = true;
    } else {
      // Create like in DB
      const createdLike = await Like.create({
        user: user,
        onModel: likedOn,
        likeable: likeableId,
      });

      // Add like in Entity
      likedEntity.likes.push(createdLike);

      likedEntity.save();
    }

    if (request.xhr) {
      // Return toggle status
      return response.status(200).json({
        message: "Request Successfull!",
        data: {
          deleted: deletedStatus,
        },
      });
    }

    return response.redirect("back");
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
