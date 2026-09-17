// Stubbed email delivery for the prototype. No SMTP is configured; instead
// every "sent" email is logged to the console so the flow can be verified
// end-to-end. Swapping in a real provider later means implementing this one
// function (e.g. with nodemailer or a transactional email API) — nothing
// else in the codebase needs to change.
function sendMail({ to, subject, body }) {
  console.log("\n----- [DEV MODE] EMAIL -----");
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(body);
  console.log("----- END EMAIL -----\n");
  return Promise.resolve({ delivered: false, devMode: true });
}

module.exports = { sendMail };
