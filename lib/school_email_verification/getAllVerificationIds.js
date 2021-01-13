import prisma from '../../lib/db/prisma'


export async function getVerficationIds(){
  const database_name = "schoolemailverification"

  
  const result = await prisma.$queryRaw('SELECT * FROM '+database_name+';')
  const id_numbers = await result.map(id => {
      
          return {
              params:{
                  id: id.random_school_index
              }
          }
      }

      )

    

  return id_numbers






}