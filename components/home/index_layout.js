import React, { useState } from "react"
import Ads from "./ad_section.js"
import PlaylistTile from "../../components/tile.js"
import 'bulma/css/bulma.css'




export default function IndexLayout( {NorthEastTop, WestTop, SouthEastTop, SouthWestTop, MidWestTop} ){

    const [isOn, setTrigger] = React.useState(true)

    return(
        <>
        <section class="section is-vcentered margin_section">
            <div class="columns is-centered">
                <div class="column is-9">

                    {/* --------------------------------- TOP TEN RESULTS PER REGION ----------------------------- */}

                    {/* NORTH EAST COAST */}
                    <div>
                        <p class="title title_adjustment">North East</p>
                    </div>
                    <div class="columns is-mobile is-vcentered region_column_adjustment">

                        {isOn && 
                            NorthEastTop.map(item => {
                                
                                return(
                                    <>
                                        <div class="column is-vcentered is-narrow">
                                            <div class="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure class="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p class="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p class="playlist_subtitles"> {item['school']}</p></a>
                                                <p class="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
                                    </>
                                )

                            })
                        
                        }
      
                    </div>


                    {/* WEST COAST */}
                    <div>
                        <p class="title title_adjustment">West</p>
                    </div>
                    <div class="columns is-mobile is-vcentered region_column_adjustment">

                        {isOn && 
                            WestTop.map(item => {
                                
                                return(
                                    <>
                                        <div class="column is-vcentered is-narrow">
                                            <div class="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure class="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p class="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p class="playlist_subtitles"> {item['school']}</p></a>
                                                <p class="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
                                    </>
                                )

                            })
                        
                        }
      
                    </div>


                    {/*  SOUTH EAST COAST */}
                    <div>
                        <p class="title title_adjustment">South East</p>
                    </div>
                    <div class="columns is-mobile is-vcentered region_column_adjustment">

                        {isOn && 
                            SouthEastTop.map(item => {
                                
                                return(
                                    <>
                                        <div class="column is-vcentered is-narrow">
                                            <div class="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure class="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p class="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p class="playlist_subtitles"> {item['school']}</p></a>
                                                <p class="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
                                    </>
                                )

                            })
                        
                        }
      
                    </div>



                    {/* SOUTH WEST */}
                    <div>
                        <p class="title title_adjustment">South West</p>
                    </div>
                    <div class="columns is-mobile is-vcentered region_column_adjustment">

                        {isOn && 
                            SouthWestTop.map(item => {
                                
                                return(
                                    <>
                                        <div class="column is-vcentered is-narrow">
                                            <div class="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure class="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p class="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p class="playlist_subtitles"> {item['school']}</p></a>
                                                <p class="has-text-weight-light playlist_subtitles">{item['owner']}</p>
                                            </div>
                                        </div>        
                                    </>
                                )

                            })
                        
                        }
      
                    </div>



                    {/* WEST COAST */}
                    <div>
                        <p class="title title_adjustment">Mid West</p>
                    </div>
                    <div class="columns is-mobile is-vcentered region_column_adjustment">

                        {isOn && 
                            MidWestTop.map(item => {
                                
                                return(
                                    <>
                                        <div class="column is-vcentered is-narrow">
                                            <div class="has-text-centered">
                                                <a href={'http://localhost:3000/playlists/'+ item['playlist_id']}>
                                                    <figure class="image is-128x128 image_placement">
                                                        <img src={item['cover_image']} />
                                                    </figure>
                                                </a>
                                                <p class="playlist_name">{item['name']}</p>
                                                <a href={'http://localhost:3000/schools/' + item['school'].split(' ').join('-')} ><p class="playlist_subtitles"> {item['school']}</p></a>
                                                <p class="has-text-weight-light playlist_subtitles">{item['owner']}</p>
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