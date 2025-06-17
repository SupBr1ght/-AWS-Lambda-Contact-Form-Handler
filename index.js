import AWS from "aws-sdk"

const ses = new AWS.SES({
    region: "us-east-1"
})


export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { name, email, question } = body;

        if (!name || !email || !question) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' }),
            };
        }

        const adminEmail = 'project.amin2344@gmail.com';
        const fromEmail = 'usertest22773417@gmail.com';

        // Email to user
        const userParams = {
            Source: fromEmail,
            Destination: { ToAddresses: [email] },
            Message: {
                Subject: { Data: 'Thanks for your question!' },
                Body: {
                    Text: {
                        Data: `Hi ${name},\n\nThanks for reaching out. We've received your question:\n\n"${question}"\n\nWe'll get back to you soon!\n\nBest,\nSupport Team`,
                    },
                },
            },
        };

        // Email to admin
        const adminParams = {
            Source: fromEmail,
            Destination: { ToAddresses: [adminEmail] },
            Message: {
                Subject: { Data: `New contact form submission from ${name}` },
                Body: {
                    Text: {
                        Data: `You've received a new question:\n\nName: ${name}\nEmail: ${email}\n\nQuestion:\n${question}`,
                    },
                },
            },
        };

        // Send both emails in parallel
        await Promise.all([
            ses.sendEmail(userParams).promise(),
            ses.sendEmail(adminParams).promise(),
        ]);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Contact form submitted successfully' }),
        };

    } catch (err) {
        console.error('Error processing contact form:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};