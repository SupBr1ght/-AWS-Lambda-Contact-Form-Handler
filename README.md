#  AWS Lambda Contact Form Handler

A lightweight AWS Lambda function (Node.js) for handling contact form submissions. It sends:

-  Confirmation email to the **user**
-  Notification email to the **admin**

>  Ideal for serverless setups, personal portfolios, or landing pages.

---

##  Tech Stack

- AWS Lambda (Node.js)
- AWS SES (Simple Email Service)
- Manual deployment (ZIP upload)
- IAM Roles for SES access

---

##  Expected Input (JSON)

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "question": "Can I hire you for freelance work?"
}
```

📤 Email Logic
To User (Confirmation):
Hi John, thanks for contacting us! We'll get back to you soon.
To Admin:

New Contact Form Submission:
```form
Name: John Doe
Email: johndoe@example.com
Question: Can I hire you for freelance work?

```
## Manual Deployment
Go to AWS Lambda Console

Create new function → Author from scratch

Set runtime: Node.js 18.x

Upload a ZIP containing:
index.js
node_modules/
package.json
Assign a role with AmazonSESFullAccess or custom SES permissions

Set environment variables:
env
EMAIL_FROM=your-verified-sender@example.com
EMAIL_TO=admin@example.com
Set handler to: index.handler

Click Deploy

## Testing
You can test from the AWS Console or locally (if mocked):
```curl
curl -X POST https://your-api-gateway-url/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com", "question": "Hello"}'
```
## Note!!!
SES sandbox limits: verify both sender and receiver

Use a verified domain to avoid SES sandbox mode

This is production-ready logic — just wrap it with API Gateway for frontend usage

