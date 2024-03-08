import nodemailer from 'nodemailer';
import accessEnv from '../helpers/accessEnv.js';

const transporter = nodemailer.createTransport({
    host: accessEnv('MAIL_HOST'),
    port: accessEnv('MAIL_PORT'),
    secure: false,
    auth: {
        user: accessEnv('MAIL_USER'),
        pass: accessEnv('MAIL_PASSWORD'),
    },
});

export default transporter;
