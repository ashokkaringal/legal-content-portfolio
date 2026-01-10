# EmailJS Auto-Reply Setup Guide - Step by Step

## ✅ Code is Already Integrated!
The EmailJS code is already added to your website. You just need to:
1. Create an EmailJS account
2. Set up the service and template
3. Add your credentials to the code

---

## Step 1: Create EmailJS Account (2 minutes)

1. **Go to:** https://www.emailjs.com/
2. **Click:** "Sign Up" (top right)
3. **Sign up with:** Your email (ashok.karingal@gmail.com) or Google account
4. **Verify your email** if prompted
5. **You're in!** You'll see the dashboard

**Free Plan:** 200 emails/month (perfect for contact forms)

---

## Step 2: Connect Your Email Service (3 minutes)

1. In EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"** button
3. Choose **"Gmail"** (recommended - easiest to set up)
4. Click **"Connect Account"**
5. **Sign in with Google** using your Gmail account (ashok.karingal@gmail.com)
6. **Authorize** EmailJS to send emails on your behalf
7. **Copy your Service ID** - it looks like: `service_abc123xyz`
   - You'll see it on the service page
   - Write it down or keep the tab open

---

## Step 3: Create Email Template (2 minutes)

1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"** button
3. Fill in the template:

   **Template Name:** `Auto Reply`
   
   **Subject:** `Thank you for contacting us - We'll respond within 24 hours`
   
   **Content (HTML):**
   ```html
   <p>Hello {{to_name}},</p>
   
   <p>Thank you for reaching out! We have received your message and will get back to you within 24 hours.</p>
   
   <p>Best regards,<br>
   Karingal, Ashok</p>
   ```
   
   **OR Content (Plain Text):**
   ```
   Hello {{to_name}},
   
   Thank you for reaching out! We have received your message and will get back to you within 24 hours.
   
   Best regards,
   Karingal, Ashok
   ```

4. **Important:** Make sure these variables are in your template:
   - `{{to_name}}` - Customer's name
   - `{{to_email}}` - Customer's email (if you want to use it)
   - `{{message}}` - Your message (if you want to use it)

5. Click **"Save"**
6. **Copy your Template ID** - it looks like: `template_xyz789abc`
   - You'll see it on the template page
   - Write it down or keep the tab open

---

## Step 4: Get Your Public Key (1 minute)

1. Click **"Account"** (left sidebar) → **"General"**
2. Scroll down to **"API Keys"** section
3. Find **"Public Key"**
4. **Copy your Public Key** - it looks like: `abcdefghijklmnop123456`
   - Write it down or keep the tab open

---

## Step 5: Update Your Code (2 minutes)

Now you need to add your credentials to the code. You have 3 values:
- **Service ID:** `service_abc123xyz`
- **Template ID:** `template_xyz789abc`
- **Public Key:** `abcdefghijklmnop123456`

### Update index.html:

1. Open `index.html` in your editor
2. Find line ~1979 (search for `emailjs.init`)
3. Find this line:
   ```javascript
   // emailjs.init('YOUR_PUBLIC_KEY');
   ```
4. Replace it with (uncomment and add your key):
   ```javascript
   emailjs.init('abcdefghijklmnop123456'); // Replace with YOUR Public Key
   ```

5. Find line ~1939 (search for `service_auto_reply`)
6. Find these lines:
   ```javascript
   'service_auto_reply',
   'template_auto_reply',
   ```
7. Replace with your actual IDs:
   ```javascript
   'service_abc123xyz',  // Replace with YOUR Service ID
   'template_xyz789abc', // Replace with YOUR Template ID
   ```

### Update contact.html:

1. Open `contact.html` in your editor
2. Find line ~660 (search for `service_auto_reply`)
3. Replace the same Service ID and Template ID as above
4. Find line ~708 (search for `emailjs.init`)
5. Replace the Public Key as above

---

## Step 6: Test It! (1 minute)

1. **Save all files**
2. **Commit and push to GitHub:**
   ```bash
   git add index.html contact.html
   git commit -m "Configure EmailJS with credentials"
   git push origin main
   ```
3. **Wait 2-3 minutes** for GitHub Pages to update
4. **Go to your live site:** https://ashokkaringal.github.io/legal-content-portfolio/
5. **Submit a test form** using a different email address
6. **Check that email inbox** - you should receive the auto-reply!

---

## ✅ What You Should See

**In the customer's email:**
- **From:** ashok.karingal@gmail.com (or your Gmail)
- **Subject:** Thank you for contacting us - We'll respond within 24 hours
- **Message:** Personalized greeting with their name

**In your email (ashok.karingal@gmail.com):**
- You'll still receive the form submission from FormSubmit

---

## 🐛 Troubleshooting

**Auto-reply not working?**
1. Check browser console (F12) for errors
2. Verify all 3 credentials are correct (Service ID, Template ID, Public Key)
3. Make sure EmailJS service is connected
4. Check that template variables match: `{{to_name}}`, `{{to_email}}`, etc.

**Getting errors?**
- Make sure you uncommented the `emailjs.init()` line
- Verify Service ID and Template ID are exact (no extra spaces)
- Check that your Gmail service is connected in EmailJS dashboard

---

## 📊 Monitoring

- **Check EmailJS Dashboard** → "Email Logs" to see sent emails
- **Free limit:** 200 emails/month
- **Upgrade:** If you need more, plans start at $15/month

---

## Need Help?

If you get stuck at any step, let me know and I can help you through it!
