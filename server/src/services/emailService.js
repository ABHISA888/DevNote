/**
 * Email Service Facade
 * Forwards calls to the Brevo SMTP Service.
 */
const emailService = require('./email');

module.exports = {
  sendWelcomeEmail: emailService.sendWelcomeEmail,
  sendPasswordResetEmail: emailService.sendPasswordResetEmail,
  futureNotificationEmail: emailService.futureNotificationEmail,
  sendEmailVerification: emailService.sendEmailVerification,
  sendTaskNotification: emailService.sendTaskNotification,
  sendProjectInvitation: emailService.sendProjectInvitation,
  sendDeadlineReminder: emailService.sendDeadlineReminder,
  sendWeeklyReport: emailService.sendWeeklyReport,
};
