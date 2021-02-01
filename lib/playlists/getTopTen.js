import prisma from '../db/prisma'
import GetFollowersForPlaylist from '../playlists/getPlaylistFollowers'


//Gets the top ten for a certain amount of days based on follower change

export async function TopTen(region,days){


    try{
        // Get the playlists based off the region 
        const result = await prisma.$queryRaw`SELECT * FROM playlists 
        WHERE region = ${region}`
        .catch(e => {
            throw e
        })
        .finally(async () => {
            await prisma.$disconnect()
        }) 



        // Now get the top 10 by region with the most follower change for the last 7 days 

        const getTopTen = await prisma.$queryRaw`
        SELECT * FROM kickback.playlists
        WHERE region = ${region} AND uploadDate > now() -  interval ${days} day
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

        console.log('Trouble Generating Top 10')
    }

 

}



