const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{  user:'manusasson@gmail.com',
            pass:'ucgqfypbpoawqjrw' }
})

const sendEmail = async (toEmail, subject,html) => {

    return await transport.sendMail({
        from,
        to:toEmail ,
        subject,
        html:html
    })
}
module.exports = {sendEmail}