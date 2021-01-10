// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// lib/prisma.ts

import prisma from '../../lib/db/prisma'
import getUserPlaylist from '../../lib/getUserPlaylist'
var SpotifyWebApi = require('spotify-web-api-node');


export default async function (req, res) {

  const result = await prisma.account.findMany({
    where: {
      providerAccountId: {
        equals: 'pinex08',
      },
    },
  })

  const token = await result[0]['accessToken']
  const user = await result[0]['providerAccountId']


  var spotifyApi = new SpotifyWebApi({
    accessToken: token
  });




  spotifyApi.getUserPlaylists(user)
  .then(function(data) {
      console.log('Retrieved playlists', data.body);
  },function(err) {
      console.log('Something went wrong!', err);
  });

  res.statusCode = 200
  res.json({ name: result })

}
