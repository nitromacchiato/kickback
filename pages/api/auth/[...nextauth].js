import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'
import getRefreshToken from '../../../lib/spotify/getRefreshToken'
import getAccessToken from '../../../lib/spotify/getToken'

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
           UPDATE THE SPOTIFY REFRESH TOKEN FOR THE USER EACH SESSION  
          -----------------------------------------------------------
      */

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
      const userAccessToken = await searchAccountTable[0]['refresh_token']
      const apiLink = await process.env.NEXTAUTH_url + '/api/spotify/getRefreshToken?token=' + userAccessToken
      const response = await fetch(apiLink)
      const token = await response.json()

      //New Access Token returned from api 
      const NewRefreshtoken = await token['access_token']
      

      // Update accounts table and update the refreshToken column 
      // const updateRefreshToken = await prisma.$executeRaw`UPDATE accounts SET refresh_token = ${NewRefreshtoken} WHERE provider_account_id = ${userName}`
      // .catch(e => {
      //   throw e
      //   })
      // .finally(async () => {
      //   await prisma.$disconnect()
      // })


      // console.log('Rows Affected: ' +updateRefreshToken)

      console.log(token)







      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      return Promise.resolve(token)
    }
  }


}







export default (req, res) => NextAuth(req, res, options)