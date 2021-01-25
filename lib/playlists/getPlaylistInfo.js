import prisma from '../db/prisma'



//Get info on playlists from the database 

async function getPlaylistInfo(playlist_id){

    const playlist = prisma.$queryRaw`SELECT * FROM playlists WHERE playlist_id = ${playlist_id}`
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

    return playlist 
}





export default getPlaylistInfo