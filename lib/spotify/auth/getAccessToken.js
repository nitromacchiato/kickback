import prisma from '../../db/prisma'
var SpotifyWebApi = require('spotify-web-api-node');


export default async function getAccessToken(req, res) {

  const result = await prisma.account.findMany({
    where: {
      providerAccountId: {
        equals: 'pinex08',
      },
    },
  }).catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  const token = await result[0]['accessToken']
  const user = await result[0]['providerAccountId']


  var spotifyApi = new SpotifyWebApi({
    accessToken: token
  });



  res.statusCode = 200
  res.json({ name: result })

}
