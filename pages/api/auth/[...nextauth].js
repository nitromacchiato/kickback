import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'
import GenerateNewRefreshToken from '../../../lib/spotify/updateRefreshToken'
import GetUserPlaylits from '../../../lib/spotify/getUserPlaylists'
import isPlaylistInDB from '../../../lib/db/isPlaylistInDB'




const prisma = new PrismaClient()


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        scope: 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-currently-playing user-top-read playlist-modify-public playlist-modify-private user-follow-modify user-follow-read user-library-modify streaming user-read-playback-state',
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

          // Replace blank spaces with a '-' to create the external link for the school 
          const search = ' '
          const replaceWith = '-'


          const SchoolName = result.school
          const urlName = SchoolName.split(search).join(replaceWith)

          const link = process.env.NEXTAUTH_URL + '/schools/' + urlName

          session.user.schoolLink = link


        
        } catch (error) {
          console.log('No School was found for user or school email was not verified')
        }






        
        /* 
            -----------------------SPOTIFY-----------------------------
            All functions related to spotify  
            -----------------------------------------------------------
        */

       // Update the spotify token every hour while a session is active
       const generateToken = await GenerateNewRefreshToken(userName)
        

       // Get Current User Playlists 
       session.playlist = await GetUserPlaylits(userName)

        //Check to see the user's playlist is already in the database 
        const alreadyAdded = [] //Empty array to hold added databases
        
        try{
          // Loop through the current users playlist and check if the playlist is added already 
          for(const id of session.playlist){

            //Set the playlist Id and then check to see if it's in the database 
            const playlistID = id.uri
            const answer = await isPlaylistInDB(playlistID,userName)

            //Checks to see how many times the playlist is in the database
            // If greater than 0 than the playlist is already in the database 
            const count = answer[0]['COUNT(playlist_id)']
            if(count > 0 ){
              alreadyAdded.push(playlistID)
            }

          }

          session.playlistAdded = alreadyAdded

        }catch{
          console.log('Error adding added playlists')
        }
  



        /* SET ACCESS TOKEN TO USER SESSION */
        //Search in database for user based of their email
        
        const getAccountInfo = await prisma.$queryRaw`SELECT * FROM accounts WHERE provider_account_id = ${userName}`
        .catch(e => {
          throw e
          })
        .finally(async () => {
          await prisma.$disconnect()
        })


        const accessToken = getAccountInfo[0]['refresh_token']
        session.user.refreshToken = accessToken
        



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