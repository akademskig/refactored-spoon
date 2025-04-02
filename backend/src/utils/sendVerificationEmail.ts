import sgMail from '@sendgrid/mail';
import config from '../config';
sgMail.setApiKey(config.SENDGRID_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const baseUrl = config.CLIENT_URL;
  const link = `${baseUrl}/verify/${token}`;

  const msg = {
    to: email,
    from: config.SENDGRID_FROM_EMAIL,
    subject: 'Verify your email - MyNews',
    html: `
      <div style="font-family: sans-serif;">
        <h2>Welcome to MyNews 👋</h2>
        <p>Click the button below to verify your email address:</p>
        <p><a href="${link}" style="
          display: inline-block;
          background-color: #d40000;
          color: #fff;
          padding: 0.75rem 1.25rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
        ">Verify Email</a></p>
        <p>If the button doesn't work, use this link:</p>
        <p><a href="${link}">${link}</a></p>
      </div>
    `,
  };

  await sgMail.send(msg);
};
