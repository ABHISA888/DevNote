const nodemailer = require('nodemailer');
const path = require('path');

// Ensure environment variables are loaded
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const host = process.env.MAIL_HOST || 'smtp-relay.brevo.com';
const port = Number(process.env.MAIL_PORT) || 587;
const user = process.env.MAIL_USER || '';
const pass = process.env.MAIL_PASS || '';
const from = process.env.MAIL_FROM || '';

console.log('==================================================');
console.log('       Brevo SMTP Startup Diagnostics             ');
console.log('==================================================');
console.log(`MAIL_HOST: ${host}`);
console.log(`MAIL_PORT: ${port}`);
console.log(`MAIL_USER length: ${user ? user.length : 0}`);
console.log(`MAIL_PASS length: ${pass ? pass.length : 0}`);
console.log(`MAIL_FROM: ${from}`);

// Sender verification warning
if (from.toLowerCase().includes('gmail.com')) {
  console.warn('⚠️  WARNING: MAIL_FROM uses a gmail.com address. Sending via Gmail address on Brevo without domain verification might cause SPF/DKIM validation failures or block delivery.');
}
console.log('--------------------------------------------------');

// Create the transporter using Brevo config
const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false, // Port 587 is secure: false
  auth: {
    user,
    pass,
  },
});

// Verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('Detailed Gmail SMTP Error:', error.message);
    logSMTPError(error);
  } else {
    console.log('✓ SMTP Connected');
  }
  console.log('==================================================');
});

/**
 * Differentiate and log SMTP error categories
 */
const logSMTPError = (error) => {
  const msg = error.message || '';
  const code = error.responseCode || 0;
  
  if (error.code === 'EAUTH' || code === 535 || msg.includes('535') || msg.includes('Authentication failed')) {
    console.error('❌ SMTP Error: Authentication Failed. Please check your Brevo SMTP key in MAIL_PASS.');
  } else if (msg.includes('Sender not allowed') || msg.includes('unauthorized sender') || msg.includes('Sender address rejected') || code === 550) {
    console.error('❌ SMTP Error: Sender Not Verified. Ensure the MAIL_FROM address is verified in your Brevo account.');
  } else if (error.code === 'ETIMEDOUT' || msg.toLowerCase().includes('timeout')) {
    console.error('❌ SMTP Error: SMTP Timeout. The connection to the Brevo SMTP server timed out.');
  } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'EADDRNOTAVAIL') {
    console.error('❌ SMTP Error: Network Error. Could not connect to Brevo SMTP host (DNS or port blocked).');
  } else if (code === 550 || msg.includes('5.1.1') || msg.toLowerCase().includes('recipient rejected') || msg.toLowerCase().includes('invalid recipient')) {
    console.error('❌ SMTP Error: Invalid Recipient. The recipient address is invalid or rejected by the remote server.');
  } else {
    console.error(`❌ SMTP Error: ${error.message}`);
  }
};

/**
 * Send email helper with 3-attempt exponential backoff retry logic
 */
const sendMailWithRetry = async (mailOptions) => {
  let delay = 1000; // starting delay: 1 second
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`[SMTP] Attempt ${attempt}: Sending email to ${mailOptions.to} (Subject: "${mailOptions.subject}")`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`[SMTP] Success: Email delivered. Response: ${info.response}`);
      return { success: true, messageId: info.messageId, response: info.response };
    } catch (error) {
      console.error(`[SMTP] Error on attempt ${attempt}: ${error.message}`);
      logSMTPError(error);
      
      if (attempt === 3) {
        return { success: false, error: error.message };
      }
      
      console.log(`[SMTP] Waiting ${delay}ms before next retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // exponential backoff
    }
  }
};

module.exports = {
  transporter,
  sendMailWithRetry,
  logSMTPError,
};
