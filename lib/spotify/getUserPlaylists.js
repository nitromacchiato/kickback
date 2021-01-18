import prisma from '../db/prisma'
var SpotifyWebApi = require('spotify-web-api-node');

async function GetUserPlaylits(userName){


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

        
        return userPlaylist

      }catch(error){
        console.log('error adding user playlist to user session')
      }



}

export default GetUserPlaylits