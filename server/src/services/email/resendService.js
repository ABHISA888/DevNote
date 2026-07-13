const { Resend } = require('resend');
const fs = require('fs').promises;
const path = require('path');

// Initialize the Resend client
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

/**
 * Helper to compile placeholders in HTML template
 */
const compileTemplate = (html, data) => {
  let compiled = html;
  for (const [key, value] of Object.entries(data)) {
    compiled = compiled.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return compiled;
};

/**
 * Send Welcome Email to a newly registered user
 * @param {Object} user - User document
 * @returns {Promise<Object>} result object
 */
const sendWelcomeEmail = async (user) => {
  const recipient = user.email;
  try {
    const templatePath = path.join(__dirname, '../../templates/welcomeEmail.html');
    const templateHtml = await fs.readFile(templatePath, 'utf8');

    const firstName = user.name ? user.name.split(' ')[0] : 'Developer';
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    
    const dataContent = {
      firstName,
      dashboardUrl: `${clientUrl}/dashboard`,
      createProjectUrl: `${clientUrl}/projects`,
      supportEmail: 'support@devnote.com',
    };

    const htmlContent = compileTemplate(templateHtml, dataContent);

    console.log(`✓ Sending Welcome Email to ${recipient} via Resend`);
    
    const fromAddress = process.env.MAIL_FROM || 'DevNote <onboarding@resend.dev>';
    const response = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      subject: '🎉 Welcome to DevNote!',
      html: htmlContent,
    });

    if (response.error) {
      console.log('❌ Email Failed');
      console.log(`Recipient: ${recipient}`);
      console.log(`Provider Response: ${response.error.message || JSON.stringify(response.error)}`);
      return { success: false, error: response.error.message };
    }

    const messageId = response.data ? response.data.id : 'N/A';
    console.log('✓ Email Sent');
    console.log(`Recipient: ${recipient}`);
    console.log(`Request ID: ${messageId}`);
    console.log(`Provider Response: Email accepted by Resend API`);

    return { success: true, messageId };
  } catch (error) {
    console.log('❌ Email Failed');
    console.log(`Recipient: ${recipient}`);
    console.log(`Provider Response: ${error.message}`);
    return { success: false, error: error.message };
  }
};

/**
 * Other future/placeholder email actions
 */
const sendPasswordResetEmail = async (user, resetUrl) => {
  const recipient = user.email;
  console.log(`✓ Sending Password Reset Email to ${recipient} via Resend`);
  try {
    const fromAddress = process.env.MAIL_FROM || 'DevNote <onboarding@resend.dev>';
    const response = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      subject: 'Reset your DevNote password',
      html: `<p>Please reset your password by clicking here: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });
    if (response.error) {
      console.log('❌ Email Failed');
      console.log(`Recipient: ${recipient}`);
      console.log(`Provider Response: ${response.error.message}`);
      return { success: false, error: response.error.message };
    }
    console.log('✓ Email Sent');
    console.log(`Recipient: ${recipient}`);
    console.log(`Request ID: ${response.data.id}`);
    return { success: true, messageId: response.data.id };
  } catch (error) {
    console.log('❌ Email Failed');
    console.log(`Recipient: ${recipient}`);
    console.log(`Provider Response: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const futureNotificationEmail = async (user, details) => {
  console.log(`[Future Email Service] futureNotificationEmail triggered for ${user.email}`, details);
  return { success: true };
};

const sendEmailVerification = async (user, verificationUrl) => {
  console.log(`[Future Email Service] sendEmailVerification triggered for ${user.email} with URL ${verificationUrl}`);
  return { success: true };
};

const sendTaskNotification = async (user, taskDetails) => {
  console.log(`[Future Email Service] sendTaskNotification triggered for ${user.email}`, taskDetails);
  return { success: true };
};

const sendProjectInvitation = async (user, projectDetails) => {
  console.log(`[Future Email Service] sendProjectInvitation triggered for ${user.email}`, projectDetails);
  return { success: true };
};

const sendDeadlineReminder = async (user, deadlineDetails) => {
  console.log(`[Future Email Service] sendDeadlineReminder triggered for ${user.email}`, deadlineDetails);
  return { success: true };
};

const sendWeeklyReport = async (user, reportDetails) => {
  console.log(`[Future Email Service] sendWeeklyReport triggered for ${user.email}`, reportDetails);
  return { success: true };
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  futureNotificationEmail,
  sendEmailVerification,
  sendTaskNotification,
  sendProjectInvitation,
  sendDeadlineReminder,
  sendWeeklyReport,
};
