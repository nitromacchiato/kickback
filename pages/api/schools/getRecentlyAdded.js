
import GetRecentPlaylist from '../../../lib/school/getRecentPlaylistPerSchool'






export default async function handler(req, res) {


    if (req.method === 'POST') {
        const schoolName = req.body.name
        const Playlists = await GetRecentPlaylist('University of Maryland')


        console.log(Playlists)

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(Playlists))

        
    } else {
        console.log('Error with method')
    }

  }
  