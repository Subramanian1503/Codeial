// Requiring the required libraries
const nodeMailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// Defining the required transporter method which provides or establishes the communication
let transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smpt.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "roopan1503@gmail.com",
    pass: "smurdhlhrcvjthcd",
  },
});

// Defining the method to convert the data into a HTML page using ejs template
let renderHtml = (data, relativePath) => {
  let renderedHtml;

  // Create a HTML page contains the data and the template from the relative path
  ejs.renderFile(
    path.join(__dirname, "views/mailers", relativePath),
    data,
    (error, template) => {
      if (error) {
        console.log(`Error while trying to render page:${error}`);
      }

      renderHtml = template;
    }
  );

  return renderHtml;
};

module.exports = {
  transporter: transporter,
  renderHtml: renderHtml,
};
