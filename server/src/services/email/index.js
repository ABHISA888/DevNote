const brevoService = require('./brevoService');
const template = require('./template');

/**
 * Send Welcome Email to a newly registered user
 * @param {Object} user - User document
 * @returns {Promise<Object>} result object
 */
const sendWelcomeEmail = async (user) => {
  const recipient = user.email;
  try {
    const firstName = user.name ? user.name.split(' ')[0] : 'Developer';
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    
    const dataContent = {
      firstName,
      dashboardUrl: `${clientUrl}/dashboard`,
      createProjectUrl: `${clientUrl}/projects`,
      supportEmail: 'support@devnote.com',
    };

    const htmlContent = await template.getCompiledTemplate('welcomeEmail', dataContent);

    console.log(`[Email Service] Sending Welcome Email to ${recipient}`);
    const result = await brevoService.sendMailWithRetry({
      from: process.env.MAIL_FROM || '"DevNote" <no-reply@devnote.com>',
      to: recipient,
      subject: '🎉 Welcome to DevNote!',
      html: htmlContent,
    });

    return result;
  } catch (error) {
    console.error(`[Email Service] Failed to send welcome email to ${recipient}: ${error.message}`);
    return { success: false, error: error.message };
  }
};

/**
 * Send Password Reset Email
 */
const sendPasswordResetEmail = async (user, resetUrl) => {
  const recipient = user.email;
  console.log(`[Email Service] Sending Password Reset Email to ${recipient}`);
  try {
    const result = await brevoService.sendMailWithRetry({
      from: process.env.MAIL_FROM || '"DevNote" <no-reply@devnote.com>',
      to: recipient,
      subject: 'Reset your DevNote password',
      html: `<p>Please reset your password by clicking here: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });
    return result;
  } catch (error) {
    console.error(`[Email Service] Failed to send password reset to ${recipient}: ${error.message}`);
    return { success: false, error: error.message };
  }
};

/**
 * Other future notification placeholder functions
 */
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

const sendProjectInvitation = async ({ to, projectName, inviterName, inviteToken, role }) => {
  try {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    // The link the user clicks. The frontend will grab the token from the URL and call our verify/accept endpoints.
    const inviteUrl = `${clientUrl}/invite/${inviteToken}`;
    
    const dataContent = {
      projectName,
      inviterName,
      role,
      inviteUrl
    };

    const htmlContent = await template.getCompiledTemplate('inviteEmail', dataContent);

    console.log(`[Email Service] Sending Project Invitation to ${to}`);
    const result = await brevoService.sendMailWithRetry({
      from: process.env.MAIL_FROM || '"DevNote" <no-reply@devnote.com>',
      to,
      subject: `You're invited to collaborate on ${projectName}`,
      html: htmlContent,
    });

    return result;
  } catch (error) {
    console.error(`[Email Service] Failed to send project invitation to ${to}: ${error.message}`);
    // We throw the error so the InviteService (Option A) knows the email failed and can rollback!
    throw error;
  }
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
