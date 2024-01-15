const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.database();

// Replace these values with your email configuration
const gmailEmail = "amandeepp26@gmail.com";
const gmailPassword = "Aman@8755";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmail = functions.database
  .ref("/formSubmissions/{pushId}")
  .onCreate((snapshot, context) => {
    const formData = snapshot.val();

    const mailOptions = {
      from: formData["your-email"],
      to: "amandeepp26@gmail.com", // Replace with your email address
      subject: "New Form Submission",
      text: `
      Name: ${formData["your-name"]}
      Phone: ${formData["your-phone"]}
      Email: ${formData["your-email"]}
      Subject: ${formData["your-subject"]}
      Message: ${formData["your-message"]}
    `,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  });
