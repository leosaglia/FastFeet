import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailerConfig from '../config/mail';

class Mail {
    constructor() {
        /**
         * Nodemailer send configuration
         */
        const { host, port, auth } = mailerConfig;
        this.transporter = nodemailer.createTransport({
            host,
            port,
            auth: auth.user ? auth : null // Algumas estratégias não possuem autenticação
        });

        this.configureTemplate();
    }

    /**
     * Template with Handlebars
     */
    configureTemplate() {
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
        this.transporter.use(
            'compile',
            nodemailerhbs({
                viewEngine: exphbs.create({
                    layoutsDir: resolve(viewPath, 'layouts'),
                    partialsDir: resolve(viewPath, 'partials'),
                    defaultLayout: 'default',
                    extname: '.hbs'
                }),
                viewPath,
                extName: '.hbs'
            })
        );
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...mailerConfig.default,
            ...message
        });
    }
}

export default new Mail();
