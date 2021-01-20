import getPlaylistIds from '../../lib/playlists/getPlaylistsId'
import getPlaylistInfo from '../../lib/playlists/getPlaylistInfo'
import Navbar from '../../components/navbar'
import Head from 'next/head'
import 'bulma/css/bulma.css'

export default function Schools({id,playlistName,playlistOwner,playlistSpotifyID,externalHref,coverImage,tracks}){


    function millisToMinutesAndSeconds(millis) {

        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }











    return(

        <>  

            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <title>Kickback</title>

                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css"></link>
            </Head>

            <Navbar />

            <section class="section is-vcentered" style={{marginTop: "2em"}}> 

                {/* <!-- CONTAINER FOR TOP OF PLAYLIST -->  */}
                <div class="container">

                    <div class="columns box">

                        {/* <!-- IMAGE --> */}
                        <div class="column">	

                            <figure class="image is-square">
                                <img src={coverImage} />
                            </figure>

                        </div>


                        {/* <!-- INFO --> */}
                        <div class="column is-centered detail_top_margin" style={{margin: "0em 2em 0em 2em"}}>

                            <div style={{height: "300px", width:"auto"}}>

                                <div class="block">
                                    <p class="title">{playlistName}</p>
                                </div>
                                <div class="block">
                                    <p class="subtitle">This playlist is about having fun and listening to good music</p>						
                                </div>

                            </div>

                            <div style={{marginTop: "auto"}}>

                                <span>
                                    <button class="button padding_mobile_button is-success is-rounded" style={{marginTop:"auto"}}>
                                        <span class="icon">
                                            <i class="fab fa-spotify"></i>
                                        </span>
                                        <span>
                                            Follow
                                        </span> 
                                    </button>
                                    <button class="button padding_mobile_button is-primary is-rounded" style={{marginTop:"auto", marginRight: "4em"}}>Add Playlist</button>
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

                                {tracks.map(item => (
                                    <tr>
                                        <th>1</th>
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

    
    // Get playlist tracks 
    const getId = await playlistSpotifyID.split(':')
    const idSolo = await getId[2]
    const getPlaylistTracks = await fetch('http://localhost:3000/api/spotify/PlaylistTracks?playlistID='+idSolo)
    const getTracks = await getPlaylistTracks.json()
    const tracks = getTracks['items']



    return {
        props: {id,playlistName,playlistOwner,playlistSpotifyID,externalHref,coverImage,tracks}, // will be passed to the page component as props
        revalidate: 1,
    }
}

