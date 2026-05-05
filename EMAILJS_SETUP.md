# EmailJS Contact Form Setup Guide

Your contact form is now ready to send emails! Follow these steps to get it working:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Gmail Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **"Add Service"**
3. Select **"Gmail"** as the service
4. Click **"Create Service"**
5. You'll see a service ID like `gmail_xxxxx` - **Save this** (this is your SERVICE_ID)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **"Create New Template"**
3. Set the **Template Name** to something like `contact_form`
4. In the **To Email** field, put: `{{to_email}}`
5. In the **Subject** field, put: `New Contact Form Message from {{from_name}}`
6. In the **Content** field, put:
   ```
   Name/Email: {{from_email}}
   
   Message:
   {{message}}
   ```
7. Click **"Save Template"**
8. You'll see a template ID like `template_xxxxx` - **Save this** (this is your TEMPLATE_ID)

## Step 4: Get Your Public Key
1. Go to **Account** settings
2. Find your **Public Key** (looks like `xxxxxxxxxxxxxx_xxxxxxxxxxxx`)
3. **Save this** (this is your YOUR_PUBLIC_KEY)

## Step 5: Update Your Code
Open the file `js/script.js` and find these lines (around line 415):

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

Replace `"YOUR_PUBLIC_KEY"` with your actual public key:
```javascript
emailjs.init("your_actual_public_key_here");
```

Then find these lines (around line 453):
```javascript
const response = await emailjs.send(
    'YOUR_SERVICE_ID',           
    'YOUR_TEMPLATE_ID',          
```

Replace them with your actual IDs:
```javascript
const response = await emailjs.send(
    'gmail_xxxxx',              // Your Service ID
    'template_xxxxx',           // Your Template ID
```

## Step 6: Test Your Form
1. Go to your website
2. Scroll to the "Get in touch" section
3. Fill in:
   - Your Email: `your-email@gmail.com`
   - Message: `This is a test message`
4. Click **"Send"**
5. Check your email at `cancinorenato20@gmail.com` - you should receive the message!

## Troubleshooting

**Error: "Failed to send message"**
- Make sure you replaced all three placeholders with your actual credentials
- Check the console (F12 > Console tab) for error messages

**Message not received**
- Check Gmail spam folder
- Make sure your Gmail service is activated in EmailJS dashboard
- Try authorizing EmailJS to access your Gmail account again

**"EmailJS is not defined"**
- The EmailJS script might not have loaded. Check your internet connection
- Refresh the page

## Security Note
- Your EmailJS Public Key is safe to share in your code (it's meant to be public)
- Never share your EmailJS API keys or passwords
- EmailJS handles sending securely through their servers

---

For more help, visit [EmailJS Documentation](https://www.emailjs.com/docs/)
