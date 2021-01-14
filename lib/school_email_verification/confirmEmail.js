import prisma from '../../lib/db/prisma'




// Confirm school email of user by updating schoolEmailVerification column in user table 
// School will offically be assigned to user 

async function confirmEmail(username){

    // Raw query to access database and set schoolEmailVerified to true by username 
    const updateEmailStatus = await prisma.$queryRaw` UPDATE users SET schoolEmailVerified = 'true' WHERE name = ${username}; ` 
    .catch(e => {
    throw e
    })
    .finally(async () => {
    await prisma.$disconnect()
    })


    console.log('Deleteing any remaining verification links')
    
    // Deletes any remaining verification links for user in the database
    const deleteAllVerificationLinksForUser = await prisma.$queryRaw`DELETE FROM schoolemailverification
     WHERE user_name = ${username};`
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })


    console.log('Deleted old verification links')
    console.log('Successfuly validated school email')

    return true 




}







export default confirmEmail