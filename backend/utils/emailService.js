import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
  let transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'youremail@gmail.com', pass: 'yourpassword' } });
  await transporter.sendMail({ from: 'youremail@gmail.com', to: email, subject, text });
};
