// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../lib/db/prisma'




export default async function (req, res) {
    const username = 'pinex08'
    const userInfo = await prisma.$queryRaw`SELECT * FROM kickback.users 
    WHERE name = ${username};`  
    .catch(e => {
         throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

    const user_id = userInfo[0].id

    console.log('successfuly found user id')


    res.send(user_id)



    

}

