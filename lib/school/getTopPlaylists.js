import prisma from '../db/prisma'

//Gets the top ten for a certain amount of days based on follower change

export default async function TopTenPerSchool(school,days){


    try{

        // Now get the top 10 by school with the most follower change for the last interval days 

        const getTopTen = await prisma.$queryRaw`
        SELECT * FROM kickback.playlists
        WHERE school = ${school} AND uploadDate > now() -  interval ${days} day
        ORDER BY follower_kickback DESC
        LIMIT 10;`
        .catch(e => {
            throw e
        })
        .finally(async () => {
            await prisma.$disconnect()
        }) 


        return getTopTen





    } catch(error) {

        console.log('Trouble Generating Top 10 Per School')
    }

 

}



