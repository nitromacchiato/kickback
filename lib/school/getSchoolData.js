import prisma from '../../lib/db/prisma'



// Get school information based off school name

export default async function getSchoolInfo(school_name){

  //process log 
  console.log('Getting School Information')

  
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
  

  //process log 
  console.log('Succesfully recieved school information')

  
    
  
  return result
  
  
  
  
  
  
}