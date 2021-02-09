import React, { useState } from "react"
import Ads from "./ad_section.js"
import Link from 'next/link'
import 'bulma/css/bulma.css'



export default function IndexLayout( {NorthEastTop, WestTop, SouthEastTop, SouthWestTop, MidWestTop} ){

    const [isOn, setTrigger] = React.useState(true)


    return(
        <>
            <section className="section is-vcentered margin_section desktop-max-section-width auto-mobile-width">


                {/* --------------------------------- TOP TEN RESULTS PER REGION ----------------------------- */}

                {/* NORTH EAST COAST */}
                <div className="region-title-padding">
                    <p className="title title_adjustment">North East</p>
                </div>

                
                <div className="columns is-mobile is-vcentered region_column_adjustment" key="NorthEast" style={{marginTop:'auto',marginLeft:'auto'}}>

                    {isOn && 
                        NorthEastTop.length > 0 &&
                            NorthEastTop.map(item => {
                                
                                return(
                                    <>
                                        {/* Turns the playlist uri "spotify:playlist:0vvXsWCC9xrXsKd4FyS8kM" just to "0vvXsWCC9xrXsKd4FyS8kM" */}
                                        <Link href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                            <div className="column is-one-fifth  box has-text-centered button hideOverFlowText fix-last-margin-issue" style={{marginLeft:'.5em',width:'154px',height:'222px'}} key={item['playlist_id'].split(':')[2]}>
                                                    <div className="has-text-centered ">

                                                        <div>
                                                            <figure className="image is-128x128 image_placement">
                                                                <img src={item['cover_image']} />
                                                            </figure>
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="playlist_name" style={{overflow:'hidden'}}>{item['name']}</p>
                                                            <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                            <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                                        </div>

                                                    </div>
                                            </div>    
                                        </Link>         
                                    </>
                                )

                            })
                    
                    }

                </div>



                {/* WEST COAST */}
                <div className="region-title-padding">
                    <p className="title title_adjustment">West</p>
                </div>
                <div className="columns is-mobile is-vcentered region_column_adjustment" key="West">

                    {isOn && 
                        WestTop.length > 0 && 
                            WestTop.map(item => {
                                
                                return(
                                    <>
                                        <Link href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                            <div className="column is-one-fifth box has-text-centered button hideOverFlowText fix-last-margin-issue" style={{marginLeft:'.5em',width:'154px',height:'222px'}} key={item['playlist_id'].split(':')[2]}>
                                                    <div className="has-text-centered">

                                                        <div>
                                                            <figure className="image is-128x128 image_placement">
                                                                <img src={item['cover_image']} />
                                                            </figure>
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="playlist_name" style={{overflow:'hidden'}}>{item['name']}</p>
                                                            <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                            <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                                        </div>

                                                    </div>
                                            </div>    
                                        </Link>        
                                    </>
                                )

                            })
                        
                    }

                </div>


                {/*  SOUTH EAST COAST */}
                <div className="region-title-padding">
                    <p className="title title_adjustment">South East</p>
                </div>
                <div className="columns is-mobile is-vcentered region_column_adjustment" key="SouthEast">

                    {isOn && 
                        SouthEastTop.length > 0 && 
                            SouthEastTop.map(item => {
                                
                                return(
                                    <>
                                        <Link href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                            <div className="column is-one-fifth box has-text-centered button hideOverFlowText fix-last-margin-issue" style={{marginLeft:'.5em',width:'154px',height:'222px'}} key={item['playlist_id'].split(':')[2]}>
                                                    <div className="has-text-centered">

                                                        <div>
                                                            <figure className="image is-128x128 image_placement">
                                                                <img src={item['cover_image']} />
                                                            </figure>
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="playlist_name" style={{overflow:'hidden'}}>{item['name']}</p>
                                                            <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                            <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                                        </div>

                                                    </div>
                                            </div>    
                                        </Link>     
                                    </>
                                )

                            })
                    
                    }

                </div>



                {/* SOUTH WEST */}
                <div className="region-title-padding">
                    <p className="title title_adjustment">South West</p>
                </div>
                <div className="columns is-mobile is-vcentered region_column_adjustment"  key="SouthWest"> 

                    {isOn && 
                        SouthWestTop.length > 0 && 
                            SouthWestTop.map(item => {
                                
                                return(
                                    <>
                                        <Link href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                            <div className="column is-one-fifth box has-text-centered button hideOverFlowText fix-last-margin-issue" style={{marginLeft:'.5em',width:'154px',height:'222px'}} key={item['playlist_id'].split(':')[2]}>
                                                    <div className="has-text-centered">

                                                        <div>
                                                            <figure className="image is-128x128 image_placement">
                                                                <img src={item['cover_image']} />
                                                            </figure>
                                                        </div>
                                                        
                                                        <div>
                                                            <p className="playlist_name" style={{overflow:'hidden'}}>{item['name']}</p>
                                                            <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                            <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                                        </div>

                                                    </div>
                                            </div>    
                                        </Link>      
                                    </>
                                )

                            })
                    
                    }

                </div>



                {/* WEST COAST */}
                <div className="region-title-padding">
                    <p className="title title_adjustment">Mid West</p>
                </div>

                <div className="columns is-mobile is-vcentered region_column_adjustment" key="MidWest">

                    {isOn && 
                        MidWestTop.length > 0 && 
                            MidWestTop.map(item => {
                                
                                return(
                                    <>
                                        <Link href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                            <div className="column is-one-fifth box has-text-centered button hideOverFlowText fix-last-margin-issue" style={{marginLeft:'.5em',width:'154px',height:'222px'}} key={item['playlist_id'].split(':')[2]}>
                                                    <div className="has-text-centered ">

                                                    
                                                        <figure className="image is-128x128 image_placement">
                                                            <img src={item['cover_image']} />
                                                        </figure>
                                                
                                                    
                                                    
                                                        <p className="playlist_name" style={{overflow:'hidden'}}>{item['name']}</p>
                                                        <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                        <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                                    

                                                    </div>
                                            </div>    
                                        </Link>    
                                    </>
                                )

                            })
                    
                    }

                </div>


            
            </section>
       </>
    )
}