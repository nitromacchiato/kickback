import prisma from '../db/prisma'


   

export default async function isPlaylistInDB(playlistID,userName){

    //Query the database and count how many records of the playlist_id there is 
    const count = await prisma.$queryRaw`SELECT COUNT(playlist_id)FROM playlists WHERE playlist_id = ${playlistID} AND addedBy = ${userName};`
    .catch(e => {
        throw e
    })
   .finally(async () => {
       await prisma.$disconnect()
    }) 

    
    return count    

}