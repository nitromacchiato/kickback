import getPlaylistIds from '../../lib/playlists/getPlaylistsId'
import getPlaylistInfo from '../../lib/playlists/getPlaylistInfo'
import Navbar from '../../components/navbar'
import Head from 'next/head'
import 'bulma/css/bulma.css'

export default function Schools({id,playlistName,playlistOwner,playlistSpotifyID,externalHref,coverImage}){



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

            <section class="section is-vcentered" style={{marginLeft:"2.0em", marginTop:"0"}}>
			    <div class="columns is-centered">


                    <p>My Playlist </p>
                    <p>{playlistName}</p>
                    <p>{playlistOwner}</p>
                    <p>{externalHref}</p>
                    
                    
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

    
  


    return {
        props: {id,playlistName,playlistOwner,playlistSpotifyID,externalHref,coverImage}, // will be passed to the page component as props
        revalidate: 1,
    }
}

