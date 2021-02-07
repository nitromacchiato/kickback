import PlaySong from '../../../lib/spotify/playTrack'
import { getSession } from 'next-auth/client'


export default async function handler(req, res) {
    
    // Header   
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    //Get the current user session 
    const session = await getSession({ req })
    

    //Only run the request if the user is logged in 
    if (session){

        //Set the refresh token needed for the api request 
        const userToken = session.user.refreshToken


        //Gets playlist id from query 
        const songId = [req.body.songID]
        const playSong = PlaySong(songId,userToken)
        
    }



    res.end()


}