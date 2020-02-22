import nodemailer from 'nodemailer';
import mailerConfig from '../config/mail';

class Mail {
    constructor() {
        const { host, port, auth } = mailerConfig;
        this.transporter = nodemailer.createTransport({
            host,
            port,
            auth: auth.user ? auth : null // Algumas estratégias não possuem autenticação
        });
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...mailerConfig.default,
            ...message
        });
    }
}

export default new Mail();
