import prisma from '../db/prisma'
//Add one follow to the playlist in the database 




async function AddFollowCount(spotifyID){

    console.log('ID IS',spotifyID)
    const addFollow = await prisma.$executeRaw`UPDATE playlists SET follower_kickback = follower_kickback + 1 WHERE playlist_id = ${spotifyID}`

    console.log('Recorded follow')


    return addFollow
}



export default AddFollowCount