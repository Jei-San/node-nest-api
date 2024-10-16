import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export default class MailRepository {
  private readonly transporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  async sendEmail(
    emails: string[],
    subject: string,
    template: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      to: emails,
      from: process.env.SENDER_MAIL,
      subject: subject,
      html: template,
    });
  }
}
