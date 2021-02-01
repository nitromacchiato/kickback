import AddFollowCount from '../../../lib/playlists/addFollowCount'

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=UTF-8')
    res.statusCode = 200


    if (req.method === 'POST') {
        // Process a POST request
        console.log(req.body)

        //Assign Variables 
        const spotifyId = req.body['spotifyID']

        //Add one follow count to the playlist id 
        const followPlusOne = await AddFollowCount(spotifyId)

        console.log('Added 1 to follower count')
        

      } else {
        // Handle any other HTTP method
        console.log('Not a post')
    }
      
      


  }
  