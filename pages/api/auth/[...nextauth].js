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

      // Prototype to add hours to current date 
      Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
      }

      // Convert to sql time format 
      // Dates are in UTC time and usually an offset of 1 day for Eastern Time (my current timeZone)
      const getRefreshTokenExpirationDate = await searchAccountTable[0]['refresh_token_expires'] // Expiration date for refresh token for user 



      // split the current date into a differnt format 
      const getCurrentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
      const dateSplit = getCurrentDate.split(' ')

      //Current Day Time format 
      const time = dateSplit[1]
      const splitTime = time.split(':')
      const currentHour = splitTime[0]
      const currentMinute = splitTime[1]
      const currentSeconds = splitTime[2]

      // Curent Day Date 
      const currentDate = dateSplit[0].split('-')
      const currentDateYear = currentDate[0]
      const currentDateMonth = currentDate[1]
      const currentDateDay = currentDate[2]
      



      //Expiration Date Formating 
      const expirationDateSplit = getRefreshTokenExpirationDate.split(' ')

      //Expiration Day Time format 
      const ExpireTime = expirationDateSplit[1]
      const splitExpireTime = ExpireTime.split(':')
      const expireHour = splitExpireTime[0]
      const expireMinute = splitExpireTime[1]
      const expireSeconds = splitExpireTime[2]


      // Expiration Day Date 
      const expirationDate = expirationDateSplit[0].split('-')
      const expirationDateYear = expirationDate[0]
      const expirationDateMonth = expirationDate[1]
      const expirationDateDay = expirationDate[2]
      



      // CREATING DATE FORMATS TO COMPARE
      const databaseDate = new Date(expirationDateYear,expirationDateMonth,expirationDateDay,expireHour,expireMinute,expireSeconds)
      const today = new Date(currentDateYear,currentDateMonth,currentDateDay,currentHour,currentMinute,currentSeconds)


      if(today > databaseDate || getRefreshTokenExpirationDate === null){

        //Add an hour to the current date to set the new expiration date 
        const newExpireDate = today.addHours(1)
        console.log(newExpireDate)



        //Assigns the refresh token from the database and sends it to the api to recieve a new refresh token 
        const userAccessToken = await searchAccountTable[0]['refresh_token']
        const apiLink = await process.env.NEXTAUTH_url + '/api/spotify/getRefreshToken?token=' + userAccessToken
        const response = await fetch(apiLink)
        const token = await response.json()

        //New Access Token returned from api 
        const NewRefreshtoken = await token['access_token']
        

        //Update accounts table and update the refreshToken column 
        const updateRefreshToken = await prisma.$executeRaw`UPDATE accounts SET refresh_token = ${NewRefreshtoken}, refresh_token_expires = ${newExpireDate} WHERE provider_account_id = ${userName}`
        .catch(e => {
          throw e
          })
        .finally(async () => {
          await prisma.$disconnect()
        })
        
        console.log('Rows Affected: ' +updateRefreshToken)

      } else 
      {
        console.log('Refresh Token already up to date in Database')
      }


      /* ------------------------  END OF SPOTIFY ----------------------------*/ 









      



      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      return Promise.resolve(token)
    }
  }


}







export default (req, res) => NextAuth(req, res, options)