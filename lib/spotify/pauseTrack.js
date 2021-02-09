var SpotifyWebApi = require('spotify-web-api-node');




export default async function PauseSong(id,token){

    var clientId = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri = 'http://localhost:3000/api/auth/callback/spotify';
    
    // Create the api object with the credentials
    var spotifyApi = new SpotifyWebApi({
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: redirectUri
    });
    

    const accessToken = token



    //Set the access token 
    spotifyApi.setAccessToken(accessToken);
    

    // Pause a User's Playback
    spotifyApi.pause()
        .then(function() {
        console.log('Playback paused');
    }, function(err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
    });

    
    

}