// Requiring the node mailer configuration
const nodeMailer = require("../configs/nodemailer");

// Define a function to send the mail with the comment information
exports.newCommentMailer = (comment) => {
  // Render the html template content from the file and make it as string
  const htmlString = nodeMailer.renderHtml(
    {
      comment: comment,
    },
    "/comments/new_comment.ejs"
  );

  nodeMailer.transporter.sendMail(
    {
      from: "roopan1503@gmail.com",
      to: comment.user.email,
      subject: "Hey my first mail sent successfully",
      html: htmlString,
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
