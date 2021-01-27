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


        // Loop through each result for the region 
        result.map(async item => {

            //Database id number 
            const id = item['id']

            //Get the playlist id 
            const playlist_id = item['playlist_id'].split(':')[2]
            
            //Last update follower count 
            const lastFollowerCount = item['followers']



            // Get the new follower count 
            const CurrentFollowers = await GetFollowersForPlaylist(playlist_id)


            //See the change since the last update 
            const FollowerChange = CurrentFollowers - lastFollowerCount


            // Update database with the follower change count 
            const uploadFollowerChange = await prisma.$executeRaw`
            UPDATE playlists 
            SET followers = ${CurrentFollowers}, follower_change = ${FollowerChange}, updateDate = NOW() 
            WHERE id = ${id}`
            .catch(e => {
                throw e
            })
            .finally(async () => {
                await prisma.$disconnect()
            }) 



            //Log Results 
            console.log('Updated', uploadFollowerChange)

        })


        


        // Now get the top 10 by region with the most follower change for the last 7 days 

        const getTopTen = await prisma.$queryRaw`
        SELECT * FROM kickback.playlists
        WHERE region = ${region} AND uploadDate > now() -  interval ${days} day
        ORDER BY follower_change DESC
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



