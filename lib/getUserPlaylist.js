
var SpotifyWebApi = require('spotify-web-api-node');




async function getUserPlaylist(Token,User){

    var spotifyApi = new SpotifyWebApi({
        accessToken: Token
      });




    spotifyApi.getUserPlaylists(User)
    .then(function(data) {
        console.log('Retrieved playlists', data.body);
    },function(err) {
        console.log('Something went wrong!', err);
    });





}

