const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'ejkbacorp@gmail.com', // generated ethereal user
        pass: 'Ej123456', // generated ethereal password
    },
});


// send mail with defined transport object
const sendEmailFunc = async(userEmail) => {
    console.log('Send registered email to this email: ' + userEmail);
    return await transporter.sendMail({
        from: 'ejkbacorp@gmail.com',
        to: userEmail,
        subject: 'no-replay-EjKBACorp notification',
        html: `<h2>😄You have successfully registed an account in EJ knowledge data base! </h2> 
        <p>Right now, you have full access to the website!🚀🚀🚀🚀🚀🚀</p> 
        <p>We would look forward to listing your fantastic journey in our website!</p> 
        <p>Welcom to give us any responses!</p> 
        <p>Thanks for you support!</p> 
        <p style='margin-top:100px'> 
        <h4>EJKBACORP</h4>
        <h5>Email: EjkbaCorp@gmail.com</h5>
        <h5>Phone: +1 (510) 783-6666</h5>
        </p>`
    })
}

module.exports = { sendEmailFunc };