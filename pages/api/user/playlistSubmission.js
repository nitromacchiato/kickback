import SubmitPlaylist from '../../../lib/db/handlePlaylistSubmission'

export default function handler(req, res) {
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


        // Handle Submission to Database 
        SubmitPlaylist(name,owner,spotifyId,href,school,playlistImage,description)

        

      } else {
        // Handle any other HTTP method
        console.log('Not a post')
    }
      
      


  }
  