var SpotifyWebApi = require('spotify-web-api-node');




export default async function isFollowingPlaylists(playlistID){

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

        // Set the access token 
        spotifyApi.setAccessToken(accessToken);
        
        // Get the authenticated user
        const user =  await spotifyApi.getMe()
        .then(function(data) {
            //console.log('Some information about the authenticated user', data.body);

            return data.body 
        }, function(err) {
            console.log('Something went wrong!', err);
        });

        
        const userID = await user.id
        console.log(userID)


        // Check if Users are following a Playlist
        const answer = await spotifyApi.areFollowingPlaylist(userID,playlistID,[userID])
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