






var SpotifyWebApi = require('spotify-web-api-node');




export default async function FollowPlaylist(id){

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
        
        //Follow a playlist
        spotifyApi.followPlaylist(id,
            {
                'public' : false
            }).then(function(data) {
                console.log('Playlist successfully followed privately!');
            }, function(err) {
                console.log('Something went wrong!',err);
            });
        
        


        
    
    });
    
    

}