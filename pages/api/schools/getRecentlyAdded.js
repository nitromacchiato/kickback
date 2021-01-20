
import GetRecentPlaylist from '../../../lib/school/getRecentPlaylistPerSchool'



// Takes a school name and then searches the database for all the playlists added by that school name 

export default async function handler(req, res) {


    if (req.method === 'POST') {
    
        const schoolName = req.query['name']
        console.log(schoolName)
        const Playlists = await GetRecentPlaylist(schoolName)
        

        console.log(Playlists)

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(Playlists))

        
    } else {
        res.status(405);
        res.end();
    }

  }
  