import React, { useState } from "react"
import Ads from "./ad_section.js"
import 'bulma/css/bulma.css'




export default function IndexLayout( {NorthEastTop, WestTop, SouthEastTop, SouthWestTop, MidWestTop} ){

    const [isOn, setTrigger] = React.useState(true)

    return(
        <>
        <section className="section is-vcentered margin_section">
            <div className="columns is-centered">
                <div className="column is-9">

                    {/* --------------------------------- TOP TEN RESULTS PER REGION ----------------------------- */}

                    {/* NORTH EAST COAST */}
                    <div className="region-title-padding">
                        <p className="title title_adjustment">North East</p>
                    </div>
                    <div className="columns is-mobile is-vcentered region_column_adjustment" key="NorthEast">

                        {isOn && 
                            NorthEastTop.map(item => {
                                
                                return(
                                    <>
                                        {/* Turns the playlist uri "spotify:playlist:0vvXsWCC9xrXsKd4FyS8kM" just to "0vvXsWCC9xrXsKd4FyS8kM" */}
                                        <div className="column is-vcentered is-narrow box" style={{marginLeft:'1em'}} key={item['playlist_id'].split(':')[2]} >
                                            <div className="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure className="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p className="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
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
                            WestTop.map(item => {
                                
                                return(
                                    <>
                                        <div className="column is-vcentered is-narrow box" style={{marginLeft:'1em'}} key={item['playlist_id'].split(':')[2]}>
                                            <div className="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure className="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p className="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
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
                            SouthEastTop.map(item => {
                                
                                return(
                                    <>
                                        <div className="column is-vcentered is-narrow box" style={{marginLeft:'1em'}} key={item['playlist_id'].split(':')[2]}>
                                            <div className="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure className="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p className="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
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
                            SouthWestTop.map(item => {
                                
                                return(
                                    <>
                                        <div className="column is-vcentered is-narrow box" style={{marginLeft:'1em'}} key={item['playlist_id'].split(':')[2]}>
                                            <div className="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure className="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p className="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
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
                            MidWestTop.map(item => {
                                
                                return(
                                    <>
                                        <div className="column is-vcentered is-narrow box" style={{marginLeft:'1em'}} key={item['playlist_id'].split(':')[2]}>
                                            <div className="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure className="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p className="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p className="playlist_subtitles"> {item['school']}</p></a>
                                                <p className="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
                                    </>
                                )

                            })
                        
                        }
      
                    </div>
                </div>
                <Ads/>


                
            </div>
            
            
        </section>
       </>
    )
}