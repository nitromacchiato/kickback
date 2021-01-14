// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import sgMail from '../../lib/school_email_verification/sendEmail'



export default async function (req, res) {


    const send = sgMail

    res.send('We Trying my guy')


    

}

