const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { SENDGRID_API_KEY } = process.env;
const sgMail = require('@sendgrid/mail');

function replaceContent(content, creds) {
    let allkeysArr = Object.keys(creds);
    allkeysArr.forEach(function (key) {
        content = content.replace(`#{${key}}`, creds[key]);
    });
    return content;
}

async function EmailHelper(templateName, reciverEmail, creds) {
    // console.log(templateName, reciverEmail, creds)
    try {
        const templatePath = path.join(__dirname, "email_templates", templateName);
        let content = await fs.promises.readFile(templatePath, "utf-8");
        const emailDetails = {
            to: reciverEmail,
            from: "takrawsuperuser@gmail.com", // Change to your verified sender
            subject: "Mail from Bookmyshow",
            text: `Hi ${creds.name} this your reset otp ${creds.otp}`,
            html: replaceContent(content, creds),
        };

        await sendMail(emailDetails.to, emailDetails.subject, emailDetails.text, emailDetails.html);

        // console.log(SENDGRID_API_KEY);
        // const transportDetails = {
        //     host: "smtp.sendgrid.net",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: "apikey",
        //         pass: SENDGRID_API_KEY,
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // };
        // const transporter = nodemailer.createTransport(transportDetails);
        // await transporter.sendMail(emailDetails);
        // console.log("email sent");
    } catch (err) {
        console.log(err);
    }
}

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendMail(to, subject, text, html) {
    // 2. Define the message object
    const msg = {
        // IMPORTANT: 'from' email must be a sender address you have verified in SendGrid.
        to: to,
        from: 'takrawsuperuser@gmail.com', // Replace with your verified sender email
        subject: subject,
        text: text,
        html: html,
    };

    try {
        // 3. Send the mail
        const [response] = await sgMail.send(msg);

        console.log('Email sent successfully via SendGrid API.');
        console.log('Status Code:', response.statusCode);
        
        // Status code 202 means the request was accepted for processing.
        if (response.statusCode === 202) {
            return { success: true, message: 'Email queued for delivery.' };
        }
        
    } catch (error) {
        console.error('SendGrid Error:', error);
        
        // Log the response body for detailed API errors
        if (error.response) {
            console.error(error.response.body);
        }
        
        throw new Error('Failed to send email via SendGrid.');
    }
}

module.exports = EmailHelper;