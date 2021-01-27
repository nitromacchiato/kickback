import TopTen from '../../lib/playlists/getTopTen'




export default async function handler(req, res) {

  const getTopTen = await TopTen('NE',7)


  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({name:'Andy'}))
}
