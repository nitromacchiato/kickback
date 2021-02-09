var SpotifyWebApi = require('spotify-web-api-node');




export default async function PlaySong(id,token){

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


            
    // Start/Resume a User's Playback 
    //{context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr'}
    spotifyApi.play({uris: id})
    .then(function() {
        console.log('Playback started');
    }, function(err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
    });
        



    
    

}