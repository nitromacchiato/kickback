
var SpotifyWebApi = require('spotify-web-api-node');




export default async function followUser(userName){

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
    .then(data => {


        const accessToken = data['user']['refreshToken']

        //Set the access token 
        spotifyApi.setAccessToken(accessToken);
        
        console.log(userName)

        /* Follow a user */
        spotifyApi.followUsers([userName])
        .then(function(data) {
            console.log(data);
        }, function(err) {
            console.log('Something went wrong!', err);
        });

        


        
    
    });
    
    

}