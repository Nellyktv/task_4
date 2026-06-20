import nodemailer from 'nodemailer';

function createTransport() {
    if (!process.env.SMTP_HOST) return null;

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

const transport = createTransport();

export async function sendVerificationEmail(email, token) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const link = `${clientUrl}/verify/${token}`;

    if (!transport) {
        console.log(`[mailer] Verification link for ${email}: ${link}`);
        return;
    }

    await transport.sendMail({
        from: process.env.SMTP_FROM || 'no-reply@theapp.local',
        to: email,
        subject: 'Verify your account',
        html: `<p>Welcome! Please confirm your account:</p>
               <p><a href="${link}">Verify my account</a></p>`,
    });
}
