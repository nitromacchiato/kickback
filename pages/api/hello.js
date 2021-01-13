// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from '../../lib/db/prisma'



export default async function (req, res) {
  
    const school_email_verifications = await prisma.session.findMany()

    res.send(school_email_verifications)


    

}
