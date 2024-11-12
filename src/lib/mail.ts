import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY??'');

const domain = process.env.DOMAIN??'http://localhost:3000';

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `<p>Hello, User</p></n><a href=${domain}/verify-email/${token}>${domain}/verify-email/${token}</a>`

    const mailOptions = {
        from: "hello@cdbd.in",
        to: email,
        subject: "Verify your email address",
        text: `Hello, User`,
        html: confirmationLink,
      };
    
    try {
        // Send to user
        const result = await sgMail.send(mailOptions);
        console.log("Verification email sent: ",result);
    } catch (error) {
        console.error("Error sending verification email: ", error);
        throw new Error("Error sending verification email");
    }
}