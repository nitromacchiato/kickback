import getPlaylistIds from '../../lib/playlists/getPlaylistsId'
import getPlaylistInfo from '../../lib/playlists/getPlaylistInfo'

import followPlaylist from '../../lib/playlists/followPlaylist'
import unfollowPlaylist from '../../lib/playlists/unfollowPlaylist'
import isFollowingPlaylists from '../../lib/playlists/isFollowingPlaylist'

import followUser from '../../lib/playlists/followUser'
import unfollowUser from '../../lib/playlists/unfollowUser'
import isFollowingUser from '../../lib/playlists/isFollowingUser'

import Navbar from '../../components/navbar'
import Head from 'next/head'

import React, { useEffect, useState  } from "react"
import { useSession } from 'next-auth/client'
import 'bulma/css/bulma.css'









export default function PlaylistPage({id,playlistName,playlistOwner,playlistSpotifyID,externalHref,coverImage,tracks, description}){

    //Check session for user to see if they're logged in with NextAuth 
	const [ session, loading ] = useSession(); 











    //Convert the ms to minutes and seconds for song track times 
    function millisToMinutesAndSeconds(millis) {

        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }




    //Does the user follow the playlist
	const [isFollowingPlaylist, setisFollowingPlaylist] = React.useState(false);


    //Add the playlist to your library 
    function FollowPlaylist(){

        //Get the current id for the spotify playlist 
        const split = playlistSpotifyID.split(':')
        const id = split[2]

    
        const follow = followPlaylist(id)
        setisFollowingPlaylist(true)
        console.log('Followed the playlist')

        // Calls the api and adds one to the follower count for kickback users 
		fetch('http://localhost:3000/api/user/addFollowCount',{
        method:'POST',
        body: JSON.stringify({
            spotifyID: playlistSpotifyID,
        }),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
		}).catch(function (error){
			console.warn('Something went wrong adding count', error)
		})       



    }

    //Remove the playlist from your library 
    function UnfollowPlaylist(){

        //Get the current id for the spotify playlist 
        const split = playlistSpotifyID.split(':')
        const id = split[2]

    
        const unfollow = unfollowPlaylist(id)
        setisFollowingPlaylist(false)
        console.log('Unfollowed the playlist')

        // Calls the api and subtracts one to the follower count for kickback users 
		fetch('http://localhost:3000/api/user/subtractFollowCount',{
        method:'POST',
        body: JSON.stringify({
            spotifyID: playlistSpotifyID,
        }),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
		}).catch(function (error){
			console.warn('Something went wrong adding count', error)
		})       


    }


    //Checks to see if the user is already following the playlist 
    useEffect(async () =>{


        // Assign playlist id 
        const split = playlistSpotifyID.split(':')
        const id = split[2]



        //Get the state which is either true or false 
        const status = await isFollowingPlaylists(id)
        //Error test status 
        console.log('Is Status Empty - Playlist?', status)
       
        //Assign result 
        const value = await status[0]
        

        console.log(value)
        //Set the state depending on the value 
        //if true then is following , if false then not following
        if(value  == true){
            setisFollowingPlaylist(true)
            
        } else {
            setisFollowingPlaylist(false)
            
        }

    },[])
    










    //Does the current user follow the playlist owner 
    const [isFollowingOwner, setisFollowingOwner] = React.useState(false);


    //Follow the owner of the playlist
    function FollowOwner(){

        console.log(playlistOwner)
        const follow = followUser(playlistOwner)
        setisFollowingOwner(true)
        console.log('Followed the owner')

    }


    //Unfollow the owner of the playlist 
    function UnfollowOwner(){

        console.log(playlistOwner)
        const follow = unfollowUser(playlistOwner)
        setisFollowingOwner(false)
        console.log('Unfollowed the owner')

    }


    //Checks to see if they are already following user 
    useEffect(async () =>{


        // Check playlist Owner 
        console.log(playlistOwner)


        //Get the state which is either true or false 
        const status = await isFollowingUser(playlistOwner)
        

        //Check if status is undefined 
        if (status === undefined){

            const value = false

        } else {

            //Assign result 
            const value = await status[0]   

        }




        console.log('User Value is',value)

        
        //Set the state depending on the value 
        //if true then is following , if false then not following
        if(value  == true){
            setisFollowingOwner(true)
            
        } else {
            setisFollowingOwner(false)
            
        }

    },[])
    




















    return(

        <>  

            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <title>Kickback</title>

                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css"></link>
                <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>
            </Head>

            <Navbar />

            <section class="section is-vcentered" style={{marginTop: "2em"}}> 

                {/* <!-- CONTAINER FOR TOP OF PLAYLIST -->  */}
                <div class="container">

                    <div class="columns box">

                        {/* <!-- IMAGE --> */}
                        <div class="column">	

                            <a href={externalHref} target="_blank">
                                <figure class="image is-square">
                                    <img src={coverImage} />
                                </figure>
                            </a>

                        </div>


                        {/* <!-- INFO --> */}
                        <div class="column is-centered detail_top_margin" style={{margin: "0em 2em 0em 2em"}}>

                            <div style={{height: "35em", width:"auto"}}>

                                <div class="block">
                                    <p class="title">{playlistName}</p>
                                </div>
                                <div class="block">
                                    <p class="subtitle">{description}</p>						
                                </div>

                            </div>

                            <div style={{marginTop: "auto"}}>
                                <span>
                                    {/* If the user is logged in change buttons depending on their following status per playlist */}
                                    {session && 
                                    <>
                                        {/*--------- BUTTONS FOR FOLLOW/UNFOLLOWING PLAYLIST OWNER---------- */}
                                                {/* IF THE USER IS FOLLOWING THE USER */}
                                            
                                                
                                                <button  className={`button padding_mobile_button is-danger is-rounded ${isFollowingOwner ? "is-active" : "is-hidden"}`} style={{marginTop:"auto"}} onClick={e => {e.preventDefault();  UnfollowOwner() }}>
                                                        <span class="icon">
                                                            <i class="fab fa-spotify"></i>
                                                        </span>
                                                        <span>
                                                            Unfollow
                                                        </span> 
                                                </button>

                                            
                                                {/* IF THE USER IS NOT FOLLOWING THE USER */}
                                        
                                                
                                                <button className={`button padding_mobile_button is-success is-rounded ${isFollowingOwner ? "is-hidden" : "is-active"}`} style={{marginTop:"auto"}} onClick={e => {e.preventDefault();  FollowOwner() }}>
                                                    <span class="icon">
                                                        <i class="fab fa-spotify"></i>
                                                    </span>
                                                    <span>
                                                        Follow
                                                    </span> 
                                                </button>      
                                            
                                            
                                            {/* ------------------------------------------------------------- */}



                                            {/*-------------- BUTTONS FOR ADDING/REMOVING PLAYLIST-----------------*/}
                                        
                                                <button className={`button padding_mobile_button is-primary is-rounded ${isFollowingPlaylist ? 'is-hidden': 'is-active'}`} style={{marginTop:"auto", marginRight: "4em"}} onClick={e => {e.preventDefault();  FollowPlaylist() }}>Add Playlist</button>
                                                <button className={`button padding_mobile_button is-danger is-rounded ${isFollowingPlaylist ? 'is-active': 'is-hidden'}`} style={{marginTop:"auto", marginRight: "4em"}} onClick={e => {e.preventDefault();  UnfollowPlaylist() }}>Remove Playlist</button>

                                            {/* ----------------------------------------------------------- */}                                    
                                            
                                    </>                                             
                                    }
                                    
                                    {/* If the user is not logged in redirect them to the spotify page to add the playlist manually */}
                                    {!session &&
                                        <>  
                                            <a href={"https://open.spotify.com/user/"+playlistOwner} target="_blank">
                                                <button class  ="button padding_mobile_button is-success is-rounded" style={{marginTop:"auto"}}>
                                                    <span class="icon">
                                                        <i class="fab fa-spotify"></i>
                                                    </span>
                                                    <span>
                                                        Follow
                                                    </span> 
                                                </button>
                                            </a>

                                            <a href={externalHref} target="_blank">    
                                                <button class= "button padding_mobile_button is-primary is-rounded" style={{marginTop:"auto", marginRight: "4em"}} >Add Playlist</button>
                                            </a>
                                        </>
                                    }
                                </span>
                            </div>


                        </div>

                    </div>



                    {/* <!-- TRACKS FOR PLAYLIST --> */}
                    <div class="columns box is-mobile" style={{marginTop: "1em"}}>



                        <table class="table is-fullwidth is-hoverable is-striped is-narrow">

                            {/* <!-- TABLE HEADER --> */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Track</th>
                                    <th>Artist</th>
                                    <th>Time</th>
                                    <th>Album</th>
                                </tr>
                            </thead>


                            {/* <!--TRACKS--> */}
                            <tbody>

                                {tracks.map((item,i)=> (
                                    <tr>
                                        <th>{i + 1}</th>
                                        <td>{item.track.name}</td>
                                        <td>{item.track.artists[0]['name']}</td>
                                        <td>{millisToMinutesAndSeconds(item.track.duration_ms)}</td>
                                        <td>{item.track.album.name}</td>
                                    </tr>

                                ))}


                            </tbody>


                        </table>


                    </div>


                </div>
                </section>





        
        </>


    )
}




export async function getStaticPaths() {

    //Get all paths by school name
    const paths = await getPlaylistIds()
    

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params }) {

    // Remove dashes from school url name and turn it to original format 
    const playlistID = params.id


    // Gets the playlist information 
    const getplaylist = await getPlaylistInfo(playlistID)
    const playlist = await getplaylist[0]
    
    //Assign values for playlist components 
    const id = await getplaylist[0]['id']
    const playlistName = await getplaylist[0]['name']
    const playlistOwner = await getplaylist[0]['owner']
    const playlistSpotifyID = await getplaylist[0]['playlist_id']
    const externalHref = await getplaylist[0]['external_href']
    const coverImage = await getplaylist[0]['cover_image']
    const description = await getplaylist[0]['description']


    
    // Get playlist tracks 
    const getId = await playlistSpotifyID.split(':')
    const idSolo = await getId[2]
    const getPlaylistTracks = await fetch('http://localhost:3000/api/spotify/PlaylistTracks?playlistID='+idSolo)
    const getTracks = await getPlaylistTracks.json()
    const tracks = getTracks['items']



    //Checks to see if there is anything in the description

    return {
        props: {id,playlistName,playlistOwner,playlistSpotifyID,externalHref,coverImage,tracks,description},// will be passed to the page component as props
        revalidate: 1,
    }

 
}

