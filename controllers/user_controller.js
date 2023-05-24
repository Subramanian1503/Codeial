// Defining a function for the controller which can be called using the name user
module.exports.user = function (request, response) {
  return response.end('<h1>User Profile</h1>');
};

// Defining a function for the controller which can be called using the name user
module.exports.createUser = function (request, response) {
  return response.end('<h1>Create User</h1>');
};
