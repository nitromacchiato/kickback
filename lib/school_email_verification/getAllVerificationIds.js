import prisma from '../../lib/db/prisma'


export async function getVerficationIds(){

    const getIds = await prisma.school_email_verification.findMany()


    if ( getIds != null ) {


        return getIds.map(data => {
            return {
              params: {
                id: string(data.id)
              }
            }
          })


    } else {
        return "Error No Id's Found"
    }





}