// Requiring the node mailer configuration
const nodeMailer = require("../configs/nodemailer");

// Define a function to send the mail with the comment information
exports.newCommentMailer = (comment) => {
  console.log("Inside the comment mailer");

  nodeMailer.transporter.sendMail(
    {
      from: "roopan1503@gmail.com",
      to: comment.user.email,
      subject: "Hey my first mail sent successfully",
      html: "<h1>New Comment Got Triggered</h1>",
    },
    (error, info) => {
      if (error) {
        console.log(`Error while trying to trigger mail : ${error}`);
        return;
      }

      console.log(`Message sent : ${info}`);
      return;
    }
  );
};
