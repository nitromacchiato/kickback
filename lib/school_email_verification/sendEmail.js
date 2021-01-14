// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs



const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const msg = {
  to: 'pineda.andy@outlook.com', // Change to your recipient
  from: 'nitromacchiato@gmail.com', // Change to your verified sender
  subject: 'Testing',
  text: 'im trying my guy',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}



sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })




export default sgMail