import getSchoolIds from '../../lib/school/getAllSchoolIds'
import getSchoolInfo from '../../lib/school/getSchoolData'
import TopTenPerSchool from '../../lib/school/getTopPlaylists'

import Navbar from '../../components/navbar'
import Head from 'next/head'
import Link from 'next/link'
import 'bulma/css/bulma.css'






export default function Schools({school,playlist,topSchoolPlaylists}){



    return(

        <>  

            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <title>Kickback - {school.name }</title>

                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css"></link>
                <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>
            </Head>

            <Navbar/>

            <section className="section is-vcentered small-screen-width-recently-added" style={{marginLeft:"2.0em", marginTop:"0"}} >

                <div style={{marginBottom: "1.3em", marginTop: "1.2em"}} className="school_title">
                    <p className="title is-size-2">{school.name}</p>
                </div>


                    <div style={{marginBottom: "0.5em"}}>
                        <p>Top Playlists</p>
                    </div>

                    {/* <!-- TOP PLAYLISTS --> */}
                    <div className="columns is-mobile is-vcentered" style={{marginTop:'.5em',overflowX:"scroll"}} >

                        
                        {topSchoolPlaylists.map((item) =>
                            <Link href={'http://localhost:3000/playlists/'+ item.playlist_id}>

                                        <div className="column is-one-fifth  box has-text-centered button hideOverFlowText fix-last-margin-issue" style={{marginLeft:'.5em',width:'154px',height:'222px'}} key={item['playlist_id'].split(':')[2]}>
                                            <div className="has-text-centered ">

                                                <div>
                                                    <figure className="image is-128x128 image_placement">
                                                        <img src={item.cover_image} />
                                                    </figure>
                                                </div>
                                                
                                                <div>
                                                    <p className="playlist_name" style={{overflow:'hidden'}}>{item.name}</p>
                                                    <p className="has-text-weight-light playlist_subtitles">{item.owner}</p>
                                                </div>

                                            </div>
                                        </div>    




                            </Link>                            
                        )}

                    </div>





                    {/* <!-- Recently Added --> */}
                    <div style={{marginBottom:"0"}}>
                        <p>Recently Added</p>
                    </div>

                    <div className="columns is-multiline is-vcentered is-mobile is-11 small-screen-width-recently-added small-screen-margin-recently-added" style={{marginTop:"10px", overflowY: "scroll"}}>


                        {playlist.reverse().map((item) => (

                            <Link href={`/playlists/${item.playlist_id}`}>               
                                        <div className="column is-one-fifth  box has-text-centered button hideOverFlowText fix-last-margin-issue " style={{marginLeft:'.5em',marginTop:'.5em',width:'154px',height:'222px'}} key={item['playlist_id'].split(':')[2]}>
                                            <div className="has-text-centered ">

                                                <div>
                                                    <figure className="image is-128x128 image_placement">
                                                        <img src={item.cover_image} />
                                                    </figure>
                                                </div>
                                                
                                                <div>
                                                    <p className="playlist_name" style={{overflow:'hidden'}}>{item.name}</p>
                                                    <p className="has-text-weight-light playlist_subtitles">{item.owner}</p>
                                                </div>

                                            </div>
                                        </div>    
                            </Link>
                        ))}
                        


                    </div>
                    {/* <!-- END of Recently Added --> */}





		    </section>	




        
        </>


    )
}




export async function getStaticPaths() {

    //Get all paths by school name
    const paths = await getSchoolIds() 
    

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params }) {

    //Remove dashes from school url name and turn it to original format 
    const school_name = params.id.split('-').join(' ')
    // Gets the school information for the current school 
    const school = await getSchoolInfo(school_name)


    //Get the top playlist for the school for the past day 
    const topSchoolPlaylists = await TopTenPerSchool(school_name,7)
    

    //Get recently added playlists by the school name
    // Send the name as a query in the url
    const getPlaylists = await fetch('http://localhost:3000/api/schools/getRecentlyAdded?name='+school_name,{
        method: 'POST',
    })
        
    const playlist = await getPlaylists.json()

    

    return {
        props: {school, playlist, topSchoolPlaylists}, // will be passed to the page component as props
        revalidate: 1,
    }
}

