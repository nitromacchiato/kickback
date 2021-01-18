import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'


var SpotifyWebApi = require('spotify-web-api-node');
const prisma = new PrismaClient()


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        scope: 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-currently-playing user-top-read playlist-modify-public playlist-modify-private',
        accessTokenUrl: 'https://accounts.spotify.com/api/token',
        profile(profile) {
          return {
            id: profile.id,
            name: profile.display_name,
            email: profile.email,
            image: profile.images?.[0]?.url,
            uri: profile.uri,
            link: profile.href,
            country: profile.country,
            
          }
        },

    })
  ],

  adapter: Adapters.Prisma.Adapter({ prisma }),


  callbacks: {
    signIn: async (user, account, profile) => {
      return Promise.resolve(true)
    },
    redirect: async (url, baseUrl) => {
      return Promise.resolve(baseUrl)
    },
    session: async (session, user) => {


      // Add function to only do this if the user is logged on 
      if (session){
        

        //Variables 
        const userName = session.user.name 
        const userEmail = session.user.email
        const userId = session.user.id



        /* 
            ----------------------- USER SCHOOL -----------------------------
            Checking to see if the user has a school on file and if their school
            email is verified. 
            -----------------------------------------------------------------
        */
        try{
          //Search in database for user based of their email
          const result = await prisma.user.findUnique({
            where: {
              email:  userEmail,
            },
          })
          .catch(e => {
            throw e
            })
          .finally(async () => {
            await prisma.$disconnect()
          })

          //Assign the school to the session 
          session.user.school = result.school
          session.user.school_verified = result.schoolEmailVerified
      

        
        } catch (error) {
          console.log('No School was found for user or school email was not verified')
        }






        
        /* 
            -----------------------SPOTIFY-----------------------------
            UPDATE THE SPOTIFY REFRESH TOKEN EVERY HOUR IF EXPIRED   
            -----------------------------------------------------------
        */


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
            const updateRefreshToken = await prisma.$executeRaw`UPDATE accounts SET refresh_token = ${NewRefreshtoken}, refresh_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR), refresh_token_updated = NOW()  WHERE provider_account_id = ${userName}`
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







      /// ---------------------- START OF GETTING CURRENT USERS PLAYLIST ---------------------------------------
        
      try{

        //Get the user access token from the database 
        const searchAccountTable = await prisma.$queryRaw`SELECT * FROM accounts 
        WHERE provider_account_id=${userName};`
        .catch(e => {
          throw e
          })
        .finally(async () => {
          await prisma.$disconnect()
        })

        const UserRefreshToken = await searchAccountTable[0]['refresh_token']

        //Setting up information for Spotify Api Wrapper 
        var spotifyApi = new SpotifyWebApi();


        spotifyApi.setAccessToken(UserRefreshToken);

        const userPlaylist = await spotifyApi.getUserPlaylists(userName)
        .then(function(data) {
          
          return data.body.items

        },function(err) {
          console.log('Something went wrong getting the user spotify playlist!', err);
        });


        // Assigns user playlist data to session
        session.playlist = await userPlaylist




  

      }catch(error){
        console.log('error adding user playlist to user session')
      }



      /* ------------------------  END OF SPOTIFY ----------------------------*/ 



    } else {
      console.log('user is offline')
    }









      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      return Promise.resolve(token)
    }
  }


}







export default (req, res) => NextAuth(req, res, options)