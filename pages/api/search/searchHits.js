import MainHits from '../../../lib/search/mainSearch'



export default async function handler(req, res) {


    if (req.method === 'POST') {
        
        //Success 
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        //Search Value 
        const value = req.body['value']


        //Search 
        const results = await MainHits(value)
        const PlaylistResults = results[0]['Playlists']
        const SchoolResults = results[0]['Schools']
        


        res.send(results)

    } else {
        // Handle any other HTTP method
        console.log('Not a post')
    }

  }
  