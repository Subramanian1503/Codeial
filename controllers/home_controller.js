// Define a function called home which will be used in main router
module.exports.home = function (request, response) {
  return response.render("home", {
    title: "Home Page",
    pageHeading: "Home page",
  });
};
