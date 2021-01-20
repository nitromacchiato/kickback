import prisma from '../db/prisma'



async function GetRecentPlaylist(schoolName){

    // Call the database and get the information based off the school name 
    const result = await prisma.$queryRaw`SELECT * FROM playlists WHERE school = ${schoolName}`
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

    return result


}





export default GetRecentPlaylist