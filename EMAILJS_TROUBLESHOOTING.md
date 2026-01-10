# EmailJS Gmail Connection Error - Fix Guide

## Error: "412 Gmail_API: Request had insufficient authentication scopes"

This error means Gmail didn't grant the correct permissions when connecting.

## Solution 1: Reconnect Gmail with Correct Permissions (Recommended)

### Step-by-Step Fix:

1. **In the EmailJS Config Service dialog:**
   - Click **"Disconnect"** button (next to "Connected as ashok.karingal@gmail.com")
   - This will disconnect the current connection

2. **Click "Create Service" or reconnect:**
   - The dialog should refresh
   - Click on "Gmail Connect" section again
   - Click **"Connect Account"** or similar button

3. **When Google asks for permissions:**
   - **IMPORTANT:** Make sure you see and **check/allow** the permission:
     - ✅ **"Send email on your behalf"** 
   - You may see multiple permission requests - **allow all of them**
   - Click **"Allow"** or **"Continue"**

4. **Complete the connection:**
   - You should see "Connected as ashok.karingal@gmail.com"
   - The error should disappear
   - Click **"Create Service"**

---

## Solution 2: Use SMTP Instead of Gmail API (Alternative)

If Gmail API continues to have issues, use SMTP:

1. **In EmailJS dashboard:**
   - Go to "Email Services"
   - Click "Add New Service"
   - Choose **"SMTP"** instead of "Gmail"

2. **Configure SMTP settings:**
   - **Service Name:** Gmail SMTP
   - **Host:** smtp.gmail.com
   - **Port:** 587
   - **Username:** ashok.karingal@gmail.com
   - **Password:** You'll need to create an "App Password" (see below)

3. **Create Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in with ashok.karingal@gmail.com
   - Click "Select app" → Choose "Mail"
   - Click "Select device" → Choose "Other" → Type "EmailJS"
   - Click "Generate"
   - **Copy the 16-character password** (no spaces)
   - Paste it in the SMTP password field

4. **Save the service**

---

## Solution 3: Use a Different Email Provider

If Gmail continues to have issues, try:

1. **Outlook/Hotmail:**
   - Choose "Outlook" service in EmailJS
   - Connect with your Microsoft account

2. **Custom SMTP:**
   - Use your domain's email SMTP settings
   - Or use a service like SendGrid, Mailgun (they have free tiers)

---

## Quick Fix Steps (Try This First):

1. **Disconnect** the current Gmail connection
2. **Clear browser cache** or use incognito mode
3. **Reconnect** and when Google asks for permissions:
   - Make sure you **scroll down** and see ALL permission requests
   - **Allow everything** - especially "Send email on your behalf"
   - Don't skip any permission screens
4. **Try again**

---

## Still Having Issues?

If none of the above work:

1. **Try a different browser** (Chrome, Firefox, Safari)
2. **Check if 2-Factor Authentication is enabled** on your Google account
3. **Use SMTP method** (Solution 2) - it's more reliable
4. **Contact EmailJS support** - they're very responsive

---

## After Fixing:

Once the service is created successfully:
1. Copy your **Service ID** (e.g., `service_in6jcht`)
2. Continue with template creation
3. Get your Public Key
4. Update the code as per EMAILJS_SETUP.md

Let me know if you need help with any of these steps!
