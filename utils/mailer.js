const brevo = require("@getbrevo/brevo");

const client = new brevo.TransactionalEmailsApi();
client.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Mialer..send email called");
    const email = {
      sender: { name: "White Circle Group", email: process.env.SENDER_EMAIL },
      to: [{ email: to }],
      subject: subject,
      textContent: text
    };

    await client.sendTransacEmail(email);
    console.log("Alert email sent to:", to);

  } catch (err) {
    console.error(
      "Email send failed:",
      err.response?.body || err.message
    );
  }
};

module.exports = sendEmail;
