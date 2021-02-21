import { getSession } from 'next-auth/client'
var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://www.localhost:3000.com/api/auth/callback/spotify'
};

var spotifyApi = new SpotifyWebApi(credentials);



export default async function handler(req, res) {

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  //Get the current user session 
  const session = await getSession({ req })
  

  //Only run the request if the user is logged in 
  if (session){

    //Set the access token needed for the api request 
    const userToken = session.accessToken


    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(userToken).then(
      function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );
    
    res.end(JSON.stringify({accessToken:userToken}))



  }


}
