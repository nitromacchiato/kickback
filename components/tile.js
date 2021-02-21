import 'bulma/css/bulma.css'
import React, { useState } from "react"


export default function PlaylistTile(){
    return(

        <div className="column is-vcentered is-narrow">
            <div className="has-text-centered">
                <figure className="image is-128x128 image_placement">
                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                </figure>
                <p className="playlist_name">Vamp Anthem</p>
                <p className="playlist_subtitles"> University of Maryland</p>
                <p className="has-text-weight-light playlist_subtitles">@Pinex08</p>
            </div>
        </div>        

    )
}