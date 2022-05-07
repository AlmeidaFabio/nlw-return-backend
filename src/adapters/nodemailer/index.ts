import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "389cec34e9a26d",
      pass: "640ee6108556bf"
    }
});

export class NodeMailerAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <hello@feedget.com>',
            to:'Fabio Almeida <fabio.644@outlook.com>',
            subject,
            html: body
        })
    }
}