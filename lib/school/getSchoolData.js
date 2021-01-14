import prisma from '../../lib/db/prisma'



// Get school information based off school name

export default async function getSchoolInfo(school_name){



    
    // Make a request to the database 
    const result = await prisma.schools.findUnique({
        where:{
            name:school_name
        }
    })
    .catch(e => {
          throw e
      })
    .finally(async () => {
      await prisma.$disconnect()
    })
  

  
    console.log(result)
  
    return result
  
  
  
  
  
  
  }