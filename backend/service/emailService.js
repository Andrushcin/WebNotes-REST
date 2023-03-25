const nodemailer = require('nodemailer');
const { ErrorSendingActivationEmail } = require('../localErrors');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Активация аккаунта на ' + process.env.API_URL,
                text: '',
                html:
                `
                <div>
                    <h1>Для активации перейдите по</h1>
                    <a href="${link}">ссылке</a>
                </div>
                `
            })
        } catch (e) {
            throw new ErrorSendingActivationEmail()
        }
    }
}

module.exports = new EmailService();