# CAPTCHA and Auto-Reply Setup Instructions

## Overview
This guide will help you set up Cloudflare Turnstile CAPTCHA and EmailJS auto-reply emails for your contact forms.

## Step 1: Cloudflare Turnstile Setup

### 1.1 Create Cloudflare Account (if you don't have one)
1. Go to https://dash.cloudflare.com/
2. Sign up for a free account (or log in if you already have one)

### 1.2 Create Turnstile Site
1. In Cloudflare dashboard, navigate to **Turnstile** (under Security)
2. Click **"Add Site"**
3. Fill in the form:
   - **Site name**: Your Portfolio Site
   - **Domain**: `ashokkaringal.github.io` (or your domain)
   - **Widget mode**: Managed (recommended)
   - **Widget appearance**: Prefers dark theme
4. Click **"Create"**

### 1.3 Get Your Site Key
1. After creating the site, you'll see your **Site Key** (public key)
2. Copy this key - you'll need it in Step 1.4

### 1.4 Update Your Website
1. Open `index.html`
2. Find this line (around line 1258):
   ```html
   <div class="cf-turnstile" data-sitekey="YOUR_TURNSTILE_SITE_KEY" data-theme="dark" style="margin-bottom: 12px;"></div>
   ```
3. Replace `YOUR_TURNSTILE_SITE_KEY` with your actual Site Key

4. Open `contact.html`
5. Find this line (around line 590):
   ```html
   <div class="cf-turnstile" data-sitekey="YOUR_TURNSTILE_SITE_KEY" data-theme="dark" style="margin-bottom: 16px;"></div>
   ```
6. Replace `YOUR_TURNSTILE_SITE_KEY` with your actual Site Key

7. In both files, find the JavaScript section and update:
   ```javascript
   if (window.turnstile && turnstileWidget) {
     turnstileToken = window.turnstile.getResponse(turnstileWidget);
   }
   ```
   The Site Key in the widget div is sufficient - no need to change this code.

## Step 2: EmailJS Auto-Reply Setup

### 2.1 Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click **"Sign Up"** (free account - 200 emails/month)
3. Verify your email address

### 2.2 Connect Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended)
4. Follow the connection steps
5. Note your **Service ID** (e.g., `service_abc123`)

### 2.3 Create Auto-Reply Email Template
1. Go to **Email Templates** in EmailJS dashboard
2. Click **"Create New Template"**
3. Use this template:

   **Template Name**: Auto-Reply to Contact Form
   
   **Subject**: `Thank you for contacting us - We'll respond within 24 hours`
   
   **Content**:
   ```
   Dear {{to_name}},

   Thank you for reaching out! We have received your message and will get back to you within 24 hours.

   Best regards,
   Karingal, Ashok
   Web Developer & Technical Consultant
   ```

4. Save the template and note your **Template ID** (e.g., `template_xyz789`)

### 2.4 Get Your Public Key
1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy this key

### 2.5 Update Your Website
1. Open `index.html`
2. Find this line (around line 1910):
   ```javascript
   emailjs.init({
     publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
   });
   ```
3. Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual Public Key

4. Find this line (around line 1950):
   ```javascript
   await emailjs.send(
     'YOUR_EMAILJS_SERVICE_ID',
     'YOUR_EMAILJS_TEMPLATE_ID',
   ```
5. Replace `YOUR_EMAILJS_SERVICE_ID` with your Service ID
6. Replace `YOUR_EMAILJS_TEMPLATE_ID` with your Template ID

7. Open `contact.html`
8. Find this line (around line 632):
   ```javascript
   emailjs.init({
     publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
   });
   ```
9. Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual Public Key

10. Find this line (around line 680):
    ```javascript
    await emailjs.send(
      'YOUR_EMAILJS_SERVICE_ID',
      'YOUR_EMAILJS_TEMPLATE_ID',
    ```
11. Replace `YOUR_EMAILJS_SERVICE_ID` with your Service ID
12. Replace `YOUR_EMAILJS_TEMPLATE_ID` with your Template ID

## Step 3: Test Your Setup

### 3.1 Test CAPTCHA
1. Open your website
2. Go to the contact form
3. You should see the Turnstile widget (invisible - runs automatically)
4. Try submitting the form - it should work

### 3.2 Test Auto-Reply
1. Fill out the contact form with a test email
2. Submit the form
3. Check your test email inbox
4. You should receive an auto-reply email within a few seconds

## Troubleshooting

### CAPTCHA Not Working
- Verify your Site Key is correct in both HTML files
- Check browser console for errors
- Make sure the Turnstile script is loaded (check Network tab)

### Auto-Reply Not Sending
- Verify all EmailJS credentials are correct
- Check EmailJS dashboard for error logs
- Make sure your email service is connected properly
- Check that the template variables match ({{to_name}}, {{to_email}}, etc.)

### Form Submission Failing
- Check browser console for JavaScript errors
- Verify Web3Forms access key is still valid
- Make sure Turnstile token is being included in form data

## Notes

- **Turnstile is invisible** - users won't see a checkbox, it works automatically
- **Auto-reply is optional** - if EmailJS fails, the form still submits successfully
- **Free tiers**:
  - Cloudflare Turnstile: Unlimited
  - EmailJS: 200 emails/month
- Both services are privacy-friendly and GDPR compliant

## Support

- Cloudflare Turnstile Docs: https://developers.cloudflare.com/turnstile/
- EmailJS Docs: https://www.emailjs.com/docs/
- Web3Forms Docs: https://docs.web3forms.com/
