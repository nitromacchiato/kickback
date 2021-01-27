import SubmitPlaylist from '../../../lib/db/handlePlaylistSubmission'
import GetPlaylistFollowers from '../../../lib/playlists/getPlaylistFollowers'



export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=UTF-8')
    res.statusCode = 200


    if (req.method === 'POST') {
        // Process a POST request
        console.log(req.body)

        //Assign Variables 
        const name = req.body['name']
        const owner = req.body['owner']
        const spotifyId = req.body['spotifyID']
        const href = req.body['href']
        const school = req.body['school']
        const playlistImage = req.body['image']
        const description = req.body['description']

        //Get the follower count for the playlist 
        const playlist_id = spotifyId.split(':')[2]
        const followers = await GetPlaylistFollowers(playlist_id)



        // Handle Submission to Database 
        SubmitPlaylist(name,owner,spotifyId,href,school,playlistImage,description,followers)

        

      } else {
        // Handle any other HTTP method
        console.log('Not a post')
    }
      
      


  }
  