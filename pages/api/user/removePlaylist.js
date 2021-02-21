import RemovePlaylist from '../../../lib/db/removePlaylist'
import { getSession } from 'next-auth/client'


export default async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=UTF-8')
    res.statusCode = 200


    //Get the current user session 
    const session = await getSession({ req })


    if (req.method === 'POST') {



      //Only run the request if the user is logged in 
      if (session){

        //Set the refresh token needed for the api request 
        const user= session.user.name
        
        //Assign Variables 
        const spotifyId = req.body['spotifyID']


        // Handle Playlist Removal
        RemovePlaylist(user,spotifyId)

      }


    } else {
      // Handle any other HTTP method
      console.log('Not a post')
  }
    
      


  }
  