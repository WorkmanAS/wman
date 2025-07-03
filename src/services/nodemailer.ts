import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
  host: "send.one.com",
  port: 587,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default mailTransporter;
