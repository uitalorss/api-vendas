import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

interface ISendMail {
  email: string;
  token: string;
}

export class Mail {
  static async sendMail({ email, token }: ISendMail) {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const message = await transport.sendMail({
      from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
      to: email,
      subject: 'Redefina sua senha',
      text: `http://localhost:3000/password/reset?token=${token}`,
    });
  }
}
