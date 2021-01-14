// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs



const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)



function sendConfirmationEmail(toEmail,confirmationLink){

  const msg = {
      templateId: 'd-26ec5160bfc346e4882d40374774cd46',
      dynamic_template_data: {
          link:confirmationLink
      },
      to: toEmail, // Change to your recipient
      from: 'nitromacchiato@gmail.com', // Change to your verified sender
      
    }
  


  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })






}









export default sendConfirmationEmail