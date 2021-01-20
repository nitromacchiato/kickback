import prisma from '../db/prisma'



async function SubmitPlaylist(name,owner,spotifyID,href,school,image){




    // Make a call to the database 
    // Add a row in the table playlists with the new playlist information 
    // Then disconnect from database 
    const UploadPlaylist = await prisma.$executeRaw`INSERT INTO playlists (name,owner,school,playlist_id,external_href,cover_image) VALUES (${name}, ${owner}, ${spotifyID}, ${href}, ${school}, ${image});`
    .catch(e => {
        throw e
    })
   .finally(async () => {
       await prisma.$disconnect()
    })        



}





export default SubmitPlaylist