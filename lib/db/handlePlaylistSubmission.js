import prisma from '../db/prisma'



async function SubmitPlaylist(name,owner,spotifyID,href,school,image,description,followers){

    //Get the region for the school 
    const getRegion = await prisma.$queryRaw`SELECT region FROM schools WHERE name = ${school}`
    .catch(e => {
        throw e
    })
   .finally(async () => {
       await prisma.$disconnect()
    }) 

    //Set region 
    const region = await getRegion[0]['region']

    // Make a call to the database 
    // Add a row in the table playlists with the new playlist information 
    // Then disconnect from database 
    const UploadPlaylist = await prisma.$executeRaw`INSERT INTO playlists (name,owner,school,region,playlist_id,external_href,cover_image,total_followers,description) VALUES (${name}, ${owner}, ${school},${region} ,${spotifyID}, ${href}, ${image}, ${followers} ,${description});`
    .catch(e => {
        throw e
    })
   .finally(async () => {
       await prisma.$disconnect()
    })        



}





export default SubmitPlaylist