// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import prisma from '../../lib/db/prisma'

export default async function (req, res) {
  
  
	const schools = await prisma.schools.findMany()
	

    res.statusCode = 200
    console.log(schools)
    res.json(schools)

}
