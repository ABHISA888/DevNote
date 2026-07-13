# Resend API Email Integration Guide for DevNote

This guide walks you through setting up and configuring the Resend Email API for the DevNote application.

---

## 🚀 1. Resend API Key Creation

To use Resend for email delivery, you need a Resend account and an API Key.

### Steps to Generate an API Key:
1. Sign up/Login to the [Resend Dashboard](https://resend.com).
2. Navigate to the **API Keys** section in the sidebar.
3. Click **Create API Key**.
4. Give it a descriptive name (e.g. `DevNote Dev`).
5. Choose **Full Access** or **Sending Access**.
6. Click **Add**.
7. Copy the key (starts with `re_`) and save it securely.

---

## ⚙️ 2. Environment Configuration

Open your server environment file at `src/.env` and update the email section to the following:

```ini
# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key_here
MAIL_FROM="DevNote <onboarding@resend.dev>"
```

> [!IMPORTANT]
> * Replace `your_resend_api_key_here` with your actual Resend API Key.
> * By default, Resend allows sending to your own login email address using the `onboarding@resend.dev` sender. To send emails to external domains, you must verify a sending domain under **Domains** in the Resend Dashboard and update `MAIL_FROM` to use that verified domain.

---

## 🛠️ 3. Verification Tool

We have provided a verification script to test your Resend email setup.

To test your credentials:
```bash
cd server
node src/test/testEmailService.js
```

### Successful Connection Output:
```text
--- Running emailService.sendWelcomeEmail Test ---
✓ Sending Welcome Email to devcodeflows+test@gmail.com via Resend
✓ Email Sent
Recipient: devcodeflows+test@gmail.com
Request ID: 12345678-abcd-1234-abcd-1234567890ab
Provider Response: Email accepted by Resend API
```

---

## 🔍 4. Common Resend Errors & Troubleshooting

### 1. `API key is invalid`
* **Cause**: Incorrect or inactive `RESEND_API_KEY`.
* **Fix**: Double check that your API key is correctly copied into `server/src/.env` without spaces or quotes.

### 2. `Restricted to domain email addresses`
* **Cause**: Trying to send an email to a recipient other than your registered account email while on the free/unverified tier.
* **Fix**: Either verify your domain in the Resend Dashboard under **Domains** tab, or only send tests to the email address associated with your Resend account.
