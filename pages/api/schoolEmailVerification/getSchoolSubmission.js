import  emailInformation  from '../../../lib/school_email_verification/validateEmail'







export default function handler(req, res) {
    const school = req.query.school 
    const email = req.query.email
    const username = req.query.username
    
    const result = emailInformation(email,school,username)

    console.log(result)




    res.redirect('http://localhost:3000/school_email_verification/email_sent')

    

  }