const nodemailer = require("nodemailer");

module.exports = sendEmail;

async function sendEmail({ from, to, subject, html }) {
  let emailTransport = nodemailer.createTransport({
    service: "gmail", // no need to set host or port etc.
    auth: {
      user: "simpl3list@gmail.com",
      pass: "uyTy@Y~x$%83.uiN5S?2",
    },
  });
  await emailTransport.sendMail({ from, to, subject, html });
}
