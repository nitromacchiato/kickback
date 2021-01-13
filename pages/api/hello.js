// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from '../../lib/db/prisma'



export default async function (req, res) {
    const paths = [ {params: {id: 'sadgfdsfg34534df24323'}} ]


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


    console.log(id_numbers)
    res.send(result)


    

}
