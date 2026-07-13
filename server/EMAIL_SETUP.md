# Brevo SMTP Integration Guide for DevNote

This guide walks you through setting up and configuring the Brevo SMTP service for the DevNote application.

---

## 🚀 1. Brevo SMTP Key Generation

To use Brevo for email delivery, you need a Brevo account and a Transactional SMTP Key.

### Steps to Generate an SMTP Key:
1. Log in to your [Brevo Dashboard](https://brevo.com).
2. Click on your profile name in the top-right corner and select **SMTP & API**.
3. Under the **SMTP** tab, locate your **SMTP Server/Host** (`smtp-relay.brevo.com`), **Port** (`587`), and **SMTP Login**.
4. Click **Generate a new SMTP key**.
5. Give the key a descriptive name (e.g. `DevNote Prod`).
6. Click **Generate** and copy the generated SMTP key immediately.
   * *Note*: Standard API keys (which start with `xkeysib-`) **cannot** be used for SMTP authentication. You must generate an SMTP key (which starts with `smtpsib-` or `xsmtpsib-`).

---

## ⚙️ 2. Environment Configuration

Open your server environment file at `src/.env` and update the SMTP section to the following:

```ini
# Brevo SMTP Configuration
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USER=your_brevo_smtp_login@smtp-brevo.com
MAIL_PASS=your_brevo_smtp_key_here
MAIL_FROM="DevNote <your_verified_sender@domain.com>"
```

> [!IMPORTANT]
> * Replace `your_brevo_smtp_login@smtp-brevo.com` with the SMTP login displayed on the Brevo SMTP & API tab.
> * Replace `your_brevo_smtp_key_here` with your generated SMTP key.
> * The `MAIL_FROM` address **must** match a sender email address that is verified under the **Senders & Domains** section in the Brevo Dashboard. If you attempt to send from an unverified address (especially `gmail.com`), Brevo may reject the delivery.

---

## 🛠️ 3. Verification & Diagnostics

On server startup, the application performs isolated diagnostics of your Brevo SMTP transporter.

To run the diagnostics manually:
```bash
node src/test/testEmailService.js
```

### Healthy Connection Log:
```text
==================================================
       Brevo SMTP Startup Diagnostics             
==================================================
MAIL_HOST: smtp-relay.brevo.com
MAIL_PORT: 587
MAIL_USER length: 24
MAIL_PASS length: 89
MAIL_FROM: DevNote <verified_sender@domain.com>
--------------------------------------------------
✓ SMTP Connected
==================================================
```

---

## 🔍 4. Common Brevo SMTP Errors & Troubleshooting

### 1. `535 5.7.8 Authentication failed`
* **Cause**: The SMTP login or key is incorrect, expired, or you are trying to use an API v3 key instead of an SMTP key.
* **Fix**: Generate a fresh SMTP key in the Brevo dashboard and verify that `MAIL_USER` matches the SMTP login exactly.

### 2. `550 Sender address rejected` / `Sender not allowed`
* **Cause**: The `MAIL_FROM` address is not verified in your Brevo account.
* **Fix**: Go to Brevo dashboard -> Senders & Domains, verify the sending email/domain, and update your `MAIL_FROM` in `.env` to match it.

### 3. `ETIMEDOUT` / `ECONNREFUSED`
* **Cause**: Network block or outgoing port block on port 587.
* **Fix**: Ensure your host environment allows outgoing TCP traffic on port 587.

---

## 🔄 5. Retry & Backoff Configuration

DevNote includes an automated 3-attempt sending mechanism with exponential backoff delays. If the Brevo cluster returns a temporary failure, Nodemailer waits and retries automatically before reporting a failure, protecting registration from being blocked.
