import { Resend } from "resend";
import "dotenv/config";

// Initialize Resend with the API key from environment variables.
const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ email, html, subject }) => {
  try {
    // Send the email using the Resend API.
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // The sender's email address.
      to: [email], // The recipient's email address.
      subject, // The subject of the email.
      html, // The HTML content of the email.
    });

    // Check for errors in the email sending process.
    if (error) {
      throw new Error(error.message);
    }

    console.log({ data }); // Log the response data if sending is successful.
  } catch (err) {
    throw new Error(err.message);
  }
};

export default sendMail;
