import getPlaylistIds from '../../lib/playlists/getPlaylistsId'





export default async function handler(req, res) {

  const playlistID = await getPlaylistIds()


  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(playlistID))
}
