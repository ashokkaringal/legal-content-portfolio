# EmailJS Auto-Reply Setup Guide

## Problem
FormSubmit's auto-reply feature doesn't work reliably with AJAX endpoints. EmailJS provides a more reliable solution.

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (free account - 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended) or your email provider
4. Follow the connection steps
5. **Copy your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Template Name:** Auto Reply
**Subject:** Thank you for contacting us - We'll respond within 24 hours

**Content:**
```
Hello {{to_name}},

Thank you for reaching out! We have received your message and will get back to you within 24 hours.

Best regards,
Karingal, Ashok
```

4. **Copy your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. **Copy your Public Key** (e.g., `abcdefghijklmnop`)

### Step 5: Update Code
1. Open `index.html`
2. Find this line (around line 1957):
   ```javascript
   // emailjs.init('YOUR_PUBLIC_KEY');
   ```
3. Replace `YOUR_PUBLIC_KEY` with your actual Public Key:
   ```javascript
   emailjs.init('abcdefghijklmnop'); // Your actual key
   ```
4. Find these lines (around line 1939-1940):
   ```javascript
   'service_auto_reply',
   'template_auto_reply',
   ```
5. Replace with your actual IDs:
   ```javascript
   'service_abc123',  // Your Service ID
   'template_xyz789', // Your Template ID
   ```
6. Do the same in `contact.html` (around line 654-660)
7. Save and push to GitHub

## Testing
1. Submit a test form on your website
2. Check the customer's email inbox
3. They should receive the auto-reply email

## Benefits
- ✅ Reliable auto-reply emails
- ✅ Free (200 emails/month)
- ✅ Works with AJAX forms
- ✅ Customizable email templates
- ✅ No reCAPTCHA required

## Need Help?
If you need assistance with any step, let me know!
