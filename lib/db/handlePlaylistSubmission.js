import prisma from '../db/prisma'



async function SubmitPlaylist(name,owner,spotifyID,href,school,image,description){




    // Make a call to the database 
    // Add a row in the table playlists with the new playlist information 
    // Then disconnect from database 
    const UploadPlaylist = await prisma.$executeRaw`INSERT INTO playlists (name,owner,school,playlist_id,external_href,cover_image,description) VALUES (${name}, ${owner}, ${school}, ${spotifyID}, ${href}, ${image}, ${description});`
    .catch(e => {
        throw e
    })
   .finally(async () => {
       await prisma.$disconnect()
    })        



}





export default SubmitPlaylist