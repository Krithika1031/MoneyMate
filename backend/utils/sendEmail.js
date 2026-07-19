import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "MoneyMate <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      return;
    }

    console.log("✅ Email Sent Successfully");
    console.log(data);
  } catch (err) {
    console.error("❌ Email Sending Failed");
    console.error(err);
  }
};

export default sendEmail;