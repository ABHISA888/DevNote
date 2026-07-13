const emailService = require('../services/emailService');

async function testWelcomeEmail() {
  console.log('\n--- Running emailService.sendWelcomeEmail Test ---');
  const dummyUser = {
    name: 'Jane Doe',
    email: 'devcodeflows+test@gmail.com',
  };

  const result = await emailService.sendWelcomeEmail(dummyUser);
  console.log('\nResult of sendWelcomeEmail:', result);
}

// Since transporter.verify() runs on import, we give it a brief moment
setTimeout(() => {
  testWelcomeEmail();
}, 2000);
