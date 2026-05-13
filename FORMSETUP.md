# Contact Form Email Setup Instructions

## Current Status
The **home** hero form (`index.html`) and **contact** page (`contact.html`) use **[FormSubmit](https://formsubmit.co)** with **`action="https://formsubmit.co/deepaashok1977@gmail.com"`** and **`method="POST"`** (same layout as FormSubmit’s site). You may still need FormSubmit’s one‑time **“Activate Form”** step; see **[WEB3FORMS_SETUP.md](WEB3FORMS_SETUP.md)** if activation links misbehave in Gmail.

## Setup Steps (alternatives — not wired in repo)

### Option A: Formspree

1. **Sign up for Formspree:**
   - Go to https://formspree.io/
   - Click "Sign Up" (free account)
   - Verify your email address

2. **Create a new form:**
   - After logging in, click "New Form"
   - Give it a name (e.g., "Portfolio Contact Form")
   - Copy the form endpoint URL (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

3. **Update the contact form:**
   - Open `contact.html`
   - Find this line: `<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   - Replace `YOUR_FORM_ID` with your actual Formspree form ID
   - Save and push to GitHub

4. **Configure email settings:**
   - In Formspree dashboard, go to your form settings
   - Add your email address in the Formspree dashboard (the address where you want notifications).
   - Enable email notifications
   - (Optional) Set up custom email templates

### Option B: EmailJS (Alternative - Free for 200 emails/month)

If you prefer EmailJS instead:

1. **Sign up for EmailJS:**
   - Go to https://www.emailjs.com/
   - Create a free account
   - Verify your email

2. **Set up email service:**
   - Connect your email provider (Gmail recommended)
   - Create an email template
   - Get your Service ID, Template ID, and Public Key

3. **Update contact.html:**
   - Replace the form action with EmailJS endpoint
   - Add EmailJS script and configuration
   - Update the JavaScript to use EmailJS API

### Option C: Web3Forms

1. **Get your access key:**
   - Go to https://web3forms.com/
   - Enter your email at web3forms.com to receive your access key.
   - Get your access key

2. **Update contact.html:**
   - Change form action to: `https://api.web3forms.com/submit`
   - Add hidden input: `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">`

## Testing

After setup:
1. Fill out the contact form on your live site
2. Check your email inbox (and spam folder)
3. Verify you receive the form submission

## Current Implementation

Deployed forms (`index.html` hero + `contact.html`):
- ✅ FormSubmit **`POST`** to **`https://formsubmit.co/deepaashok1977@gmail.com`** (homepage pattern)
- ✅ **`_subject`**, **`_next`** return URL, **`_honey`**, **`_captcha=false`**
- ✅ Recipient: **`deepaashok1977@gmail.com`**

## Need Help?

If you need assistance setting up any of these services, let me know which option you prefer and I can help configure it!


