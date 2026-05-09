# Web3Forms Setup - Quick Guide

## ✅ Why Web3Forms?
- **250 free submissions/month** (vs 50 for Formspree)
- **No signup required** - just get an access key
- **More features on free plan** (webhooks, custom redirects)
- **Lower cost** if you need Pro ($15 vs $30/month)

## 🚀 Quick Setup (2 minutes)

### Step 1: Get Your Access Key
1. Go to **https://web3forms.com/**
2. Enter your email: `deepaashok1977@gmail.com`
3. Click "Get Your Access Key"
4. Copy the access key (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 2: Update contact.html
1. Open `contact.html`
2. Find this line:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
   ```
3. Replace `YOUR_ACCESS_KEY` with your actual access key from Step 1
4. Save and push to GitHub

### Step 3: Test It!
1. Fill out the contact form on your live site
2. Submit the form
3. Check your email inbox (and spam folder)
4. You should receive the form submission!

## 📧 Email Configuration

The form is already configured to:
- Send emails to: `deepaashok1977@gmail.com`
- Subject: "New Contact Form Submission from Portfolio"
- Include all form fields (name, email, company, message)

## 🔒 Spam Protection

Web3Forms includes built-in spam protection:
- Honeypot field (botcheck)
- Rate limiting
- IP-based filtering

## 🎨 Customization Options

You can customize:
- **Email subject**: Change the `subject` hidden input
- **From name**: Change the `from_name` hidden input
- **Redirect URL**: Add `redirect` hidden input with your thank you page URL
- **Webhooks**: Add webhook URL for integrations (Slack, Discord, etc.)

## 📊 View Submissions

- Go to https://web3forms.com/
- Log in with your email
- View all form submissions in the dashboard

## 🆘 Troubleshooting

**Not receiving emails?**
- Check spam/junk folder
- Verify access key is correct
- Make sure email is verified in Web3Forms dashboard

**Form not submitting?**
- Check browser console for errors
- Verify access key is set correctly
- Ensure all required fields are filled

## 💡 Pro Tips

1. **Custom Thank You Page**: Add this to redirect after submission:
   ```html
   <input type="hidden" name="redirect" value="https://ashokkaringal.github.io/legal-content-portfolio/thank-you.html">
   ```

2. **Slack/Discord Notifications**: Add webhook URL in Web3Forms dashboard

3. **Google Sheets Integration**: Connect Web3Forms to Google Sheets to log all submissions

---

**Need help?** The form is already configured, you just need to add your access key!


