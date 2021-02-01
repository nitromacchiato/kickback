import prisma from '../db/prisma'
//Add one follow to the playlist in the database 




async function SubtractFollowCount(spotifyID){

    console.log('ID IS',spotifyID)
    const addFollow = await prisma.$executeRaw`UPDATE playlists SET follower_kickback = follower_kickback - 1 WHERE playlist_id = ${spotifyID}`

    console.log('Recorded unfollow')


    return addFollow
}



export default SubtractFollowCount