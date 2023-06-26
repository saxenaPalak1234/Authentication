const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({

    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

    auth: {
        user: process.env.user_email,
        pass: process.env.user_pass
    },
}
);

let renderTemplate = (data, relativePath) => {
    try {

        //joining path with ejs file
        let mailHTML;
        ejs.renderFile(path.join(__dirname, '../view/mailers', relativePath),
            data, (error, data) => {
                if (error) {
                    console.log('Error in rendering HTML', error);
                    return;
                }
                mailHTML = data;
            });

        return mailHTML;
    } catch (error) {
        console.log('Error', error);
    }
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}