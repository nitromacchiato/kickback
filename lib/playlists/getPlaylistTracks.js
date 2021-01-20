var SpotifyWebApi = require('spotify-web-api-node');




export default async function PlaylistTracks(){

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
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);

      //Get playlist tracks
      spotifyApi.getPlaylistTracks('78yl8YC3jhMuOJTH8WblJy', {
        offset: 1,
        limit: 100,
        fields: 'items'
      })
      .then(
        function(data) {
          //console.log('The playlist contains these tracks', data.body);
          
          res.send(data.body)
        },
        function(err) {
          console.log('Something went wrong!', err);
        }
      );






    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );

  console.log('Results:', awaitresults)


  return results


}






