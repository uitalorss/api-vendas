import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { MailTemplate } from './MailTemplate';

dotenv.config();

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  email: string;
  subject: string;
  template: IParseMailTemplate;
}

const mailTemplate = new MailTemplate();

export class Mail {
  static async sendMail({ email, subject, template }: ISendMail) {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    transport.sendMail({
      from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
      to: email,
      subject: subject,
      html: await mailTemplate.parse(template),
    });
  }
}
