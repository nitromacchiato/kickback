
var SpotifyWebApi = require('spotify-web-api-node');




export default async function isFollowingUser(userName){

    var clientId = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri = 'http://localhost:3000/api/auth/callback/spotify';
    
    // Create the api object with the credentials
    var spotifyApi = new SpotifyWebApi({
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: redirectUri
    });
    

    //Get access token from session 
    const session = await fetch('http://localhost:3000/api/auth/session')
    .then(response => response.json())
    .then(async data => {


        const accessToken = data['user']['refreshToken']

        //Set the access token 
        spotifyApi.setAccessToken(accessToken);
        
        
        const usersId = userName

        const answer = await spotifyApi.isFollowingUsers([usersId])
        .then(function(data) {
          let isFollowing = data.body;
          

          return isFollowing

        }, function(err) {
          console.log('Something went wrong!', err);
        });

        return answer
        
    
    });
    
    return session

}