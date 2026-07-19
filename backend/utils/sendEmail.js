import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  family: 4,                 // Force IPv4
  connectionTimeout: 30000,  // 30 seconds
  greetingTimeout: 30000,
  socketTimeout: 30000,
});
    await transporter.sendMail({
      from: `"MoneyMate" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent Successfully");
  } catch (error) {
    console.log("❌ Email Sending Failed");
    console.log(error);
  }
};

export default sendEmail;