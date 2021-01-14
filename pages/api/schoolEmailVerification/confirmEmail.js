import confirmEmail from '../../../lib/school_email_verification/confirmEmail'



// Takes the username and sends it  to confirm email to update schoolEmailVerified to true 

export default function handler(req, res) {

    //Gets user name from query url 
    const username = req.query.username
    
    //Updates database 
    const EmailConfirmed = confirmEmail(username)


    console.log('Successfuly Added School to User: '+username)



    res.redirect('http://localhost:3000/school_email_verification/email_confirmed')

    

  }