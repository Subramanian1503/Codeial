const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async (request, response) => {
  // Get the user from DB using request
  const email = request.body.email;
  const password = request.body.password;
  try {
    const user = await User.findOne({
      email: email,
    });

    // Check whether the user exists and password matches
    if (!user || user.password != password) {
      // If not, Send 422 status as response
      return response.status(422).json({
        message: "Invalid user name or password",
      });
    } else {
      // If yes, Create token and send response
      return response.status(200).json({
        message: "User Logged in successfully",
        token: jwt.sign(
          {
            data: JSON.stringify(user),
          },
          "codeial",
          {
            expiresIn: 60 * 60,
          }
        ),
      });
    }
  } catch (error) {
    console.log(`Error occurred while logging in: ${error}`);
    // If error occured, send 500 response
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};
