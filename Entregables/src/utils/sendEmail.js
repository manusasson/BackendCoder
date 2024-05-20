const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'manusasson@gmail.com',
        pass: 'ucgqfypbpoawqjrw'
    },
    tls: {
        rejectUnauthorized: false // No verificar certificados SSL
    }
});

const sendEmail = async (toEmail, subject,html) => {
    const from = 'manusasson@gmail.com';

    return await transport.sendMail({
        from,
        to:toEmail ,
        subject,
        html:html
    })
}
module.exports = {sendEmail}