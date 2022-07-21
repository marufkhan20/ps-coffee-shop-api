// external imports
const nodeMailer = require("nodemailer");

const sendEmail = async ({ to, from, subject, text, html }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    to,
    from,
    subject,
    text,
    html,
  });

  return info;
};

module.exports = sendEmail;
