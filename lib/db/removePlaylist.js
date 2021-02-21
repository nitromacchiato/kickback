import prisma from '../db/prisma'



async function RemovePlaylist(addedBy,spotifyID){

    //  Query the database but first turn off SQL_SAFE_UPDATES and then 
    // Proccess query to delete selected playlist 
    // Then turn safemode back on 
    const DeletePlaylist = await prisma.$executeRaw`DELETE FROM playlists WHERE addedBy=${addedBy} AND playlist_id=${spotifyID};`
    .catch(e => {
        throw e
    })
    .finally(async () => {
       await prisma.$disconnect()
    })        

    console.log('Removed Playlist')

}





export default RemovePlaylist