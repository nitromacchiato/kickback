import prisma from '../../lib/db/prisma'


export async function schools() {

  
    //Make a database request to get all the schools 
    const getSchool = await prisma.$queryRaw`SELECT * FROM kickback.schools;`
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })        

    
    return {
        schools:getSchool
    }


}