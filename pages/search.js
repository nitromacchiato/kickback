import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from "react"
import NavbarForSearch from '../components/navbar_forSearch'
import { schools } from '../lib/db/getListOfSchools'
import 'bulma/css/bulma.css'



export default function Search({colleges}){


    //Search 
    const [SchoolResults, setSchoolResults] = React.useState([]);
    const [PlaylistResults, setPlaylistResults] = React.useState([])


    // Search Status 
    const [SchoolSearchStatus,areThereSchoolResults] = React.useState(false)
    const [PlaylistSearchStatus, areTherePlaylistResults] = React.useState(false)

    // Get the search results
    const SearchForHits = (value) => {

  


        // Call API to search 
        
		// Calls the api with a post request and submits the parameters in a body 
		fetch('http://localhost:3000/api/search/searchHits',{
			method:'POST',
			body: JSON.stringify({
				value:value
			}),
			headers:{
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(response => response.json())
        .then(data => {

            // If the search results aren't empty then pass them to the react hook
            const schools = data[0]['Schools']
            const playlists = data[0]['Playlists']


            // Makes sure the list has at least one result 
            // If it does not then it will continue to leave the state of results for each list to false 

            if(schools.length != 0){
                setSchoolResults(schools)
                areThereSchoolResults(true)
            } else {
                areThereSchoolResults(false)
            }

            if(playlists.length != 0){
                setPlaylistResults(playlists)    
                areTherePlaylistResults(true)
            } else {
                areTherePlaylistResults(false)
            }






        })
        .catch(function (error){
			console.warn('Something went wrong with search query.', error)
		})







    }












    return(
        <>
        <Head>
            <meta charSet="utf-8" />
            <meta charSet="utf-8" />
		    <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>Kickback</title>
        
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css"/>     
            <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>
        </Head>
        
        <NavbarForSearch listOfSchools={colleges} search={SearchForHits}/>




        <section className="section is-fullheight">
            <div className="container mobile-margin-space" style={{marginTop:'5em'}}>
                
      

                {/* SECTION FOR SCHOOL RESULTS  */}
                <div className="notification">

                    {/* Title For Section */}
                    <div>
                        <div style={{marginLeft:'1.7em'}}>
                            <span className="icon">
                                <i className="fas fa-graduation-cap"></i>
                                <p style={{marginLeft:'5px'}}>Schools</p>
                            </span>
                        </div>
                        <hr className="solid" />
                    </div>
                    

                    {/* ----------------- Results ----------------- */}
                    <div className="columns is-mobile is-vcentered " key="school_results" style={{ overflowX:'scroll'}}>

                        {/* If there are school results display them */}
                        {areThereSchoolResults && 

                            SchoolResults.map(item => {
                                return(
                                    <>
                                        
                                        <Link href={'http://localhost:3000/schools/'+item.name.split(' ').join('-')}>
                                            <div className="column is-one-fifth box has-text-centered button" style={{height:'50px', width:'15em', marginLeft:'1em', marginBottom:'auto'}} key={item.name}>
                                                <p className="subtitle">{item.name} </p>
                                            </div>
                                        </Link>
                                        

                                    </>
                                )
                            })
                        }

                    </div>


                    {/* If there are no school results */}

                    {!areThereSchoolResults && 
                    
                        <>
                                <p>No Results</p>
                        </>
                    
                    }


                </div>
                









                {/* SECTION FOR PLAYLIST RESULTS  */}
                <div className="notification">
                    {/* Title For Section */}
                    <div>
                        <div style={{marginLeft:'1.7em'}}>
                            <span className="icon">
                                <i className="fas fa-compact-disc"></i>
                                <p style={{marginLeft:'5px'}}>Playlists</p>
                            </span>
                        </div>
                        <hr className="solid" />
                    </div>

   
                    <div className="columns is-mobile is-vcentered" key="playlist_column" style={{ overflowX:'scroll'}}>
                        {/* If there are school results display them */}
                        {areTherePlaylistResults && 

                            PlaylistResults.map(item => {
                                return(
                                    <>
                                        <Link href={"http://localhost:3000/playlists/"+item.playlist_id}>
                                        <div className="column is-one-fifth box has-text-centered button" style={{width:'154px',height:'222px', marginLeft:'1em', marginBottom:'auto'}} key={item.playlist_id}>
                                            
                                                <figure className="image is-128x128">
                                                    <img src={item.cover_image}/>
                                                </figure>         
                                            <p className="hideOverFlowText">{item.name}</p>
                                            <p className="hideOverFlowText">{item.owner}</p>
                                            <p className="hideOverFlowText">{item.school}</p>                 
                                        </div>
                                        </Link>
                                    </>
                                )
                            })
                        }
                    </div>



                    {!areThereSchoolResults &&
                    
                        <>
                            <p>No Results</p>
                        </>
                    
                    }











                </div>











            </div>








        </section>
 










        </>
    )
}



export async function getStaticProps(context) {

    //Make a database request to get all the schools 
    const school = await schools()
    const colleges = school.schools

    
    if (colleges != null){
  
  
      return {
        props: {colleges}, // will be passed to the page component as props
      }
  
  
    } else {
  
      const colleges =  { name: 'Error Loading Schools' };
      return{
        props:{colleges}
      }
    }
  }