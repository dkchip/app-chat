import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';

const myOAuth2Client = new OAuth2Client(process.env.GOOGLE_MAILER_CLIENT_ID, process.env.GOOGLE_MAILER_CLIENT_SECRET);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

// Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên

const sendEmail = async (email: string, title: string, content: string): Promise<void> => {
    try {
        const myAccessTokenObject = await myOAuth2Client.getAccessToken();
        const myAccessToken = myAccessTokenObject?.token;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.ADMIN_EMAIL_ADDRESS,
                clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
                clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken,
            } as any,
        });
        const emailOptions = {
            from: '"Sender Name Chat App',
            to: email,
            subject: title,
            text: content,
        };
        transporter.sendMail(emailOptions);
    } catch (error) {
        console.log(error);
    }
};

export default sendEmail;
