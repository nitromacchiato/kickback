import prisma from '../db/prisma'


async function GenerateNewRefreshToken(userName){

    try{

        /// ---------------------- Setting the refresh token to update every hour for the user ---------------------------------------

      
        //Get the user access token from the database 
        const searchAccountTable = await prisma.$queryRaw`SELECT * FROM accounts 
        WHERE provider_account_id=${userName};`
        .catch(e => {
          throw e
          })
        .finally(async () => {
          await prisma.$disconnect()
        })


        //Assigns the refresh token from the database and sends it to the api to recieve a new refresh token 
        const getRefreshTokenExpireDate = await searchAccountTable[0]['refresh_token_expires']
        const getRefreshTokenUpdateTime = await searchAccountTable[0]['refresh_token_updated']

        const RefreshTokenExpireDate = await new Date(getRefreshTokenExpireDate) || null
        const lastUpdate = await new Date(getRefreshTokenUpdateTime) || null 

        

        if (lastUpdate > RefreshTokenExpireDate || lastUpdate === null || RefreshTokenExpireDate === null){

          //Process Log 
          console.log('Your refresh token has expired. Generating a new one')

          //Get the refresh token from the database 
          const userAccessToken = await searchAccountTable[0]['refresh_token'] 

          //Make an api request to the getRefreshToken api 
          const apiLink = await process.env.NEXTAUTH_url + '/api/spotify/getRefreshToken?token=' + userAccessToken
          const response = await fetch(apiLink)
          const token = await response.json()

          //New Access Token returned from api 
          const NewRefreshtoken = await token['access_token']

          //Proccess Log 
          console.log('Successfully generated a new refresh token: ',NewRefreshtoken)

          //Update accounts table and update the refreshToken column and refresh_token_expire column by getting the current date and adding an hour to it 
          const updateRefreshToken = await prisma.$executeRaw`UPDATE accounts SET refresh_token = ${NewRefreshtoken}, refresh_token_expires = DATE_ADD(NOW(), INTERVAL 55 MINUTE), refresh_token_updated = NOW()  WHERE provider_account_id = ${userName}`
          .catch(e => {
            throw e
            })
          .finally(async () => {
            await prisma.$disconnect()
          })
          


          //Process Log 
          console.log('Rows Affected: ' +updateRefreshToken)
          console.log('We are in the future')




          

        } else {

          //Update the time for refresh_token_updated to current time 
          const updateRefreshToken = await prisma.$executeRaw`UPDATE accounts SET refresh_token_updated = NOW()  WHERE provider_account_id = ${userName}`
          .catch(e => {
            throw e
            })
          .finally(async () => {
            await prisma.$disconnect()
          })


         
        }


      /// ---------------------- END OF SETTING REFRESH TOKEN EACH HOUR ---------------------------------------
      } catch (error){
        console.log('Trouble updating refresh token')
      }

}



export default GenerateNewRefreshToken