
var SpotifyWebApi = require('spotify-web-api-node');




export default async function GetFollowersForPlaylist(playlistID){

  var clientId = process.env.SPOTIFY_CLIENT_ID,
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  // Create the api object with the credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
  });


  
  // Retrieve an access token.
  const results = spotifyApi.clientCredentialsGrant().then(
    function(data) {

  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);


      const playlist_followers = spotifyApi.getPlaylist(playlistID)
      .then(function(data) {
        //console.log(data.body)
        const playlist = data.body
        const followers = playlist['followers']['total']

        return followers
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  


      return playlist_followers


    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );

  


  return results


}






