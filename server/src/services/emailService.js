/**
 * Email Service Facade
 * Forwards calls to the Resend Service.
 */
const resendService = require('./email/resendService');

module.exports = {
  sendWelcomeEmail: resendService.sendWelcomeEmail,
  sendPasswordResetEmail: resendService.sendPasswordResetEmail,
  futureNotificationEmail: resendService.futureNotificationEmail,
  sendEmailVerification: resendService.sendEmailVerification,
  sendTaskNotification: resendService.sendTaskNotification,
  sendProjectInvitation: resendService.sendProjectInvitation,
  sendDeadlineReminder: resendService.sendDeadlineReminder,
  sendWeeklyReport: resendService.sendWeeklyReport,
};
