import prisma from '../../lib/db/prisma'


export async function schools() {

    try{

        //Make a database request to get all the schools 
        const getSchool = await prisma.schools.findMany()
        .catch(e => {
            throw e
        })
       .finally(async () => {
           await prisma.$disconnect()
        })        
    
        
        return {
            schools:getSchool
        }
    

    } catch (error) {

        console.log(error)

        
    }

}