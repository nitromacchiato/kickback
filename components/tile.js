import 'bulma/css/bulma.css'
import React, { useState } from "react"


export default function PlaylistTile(){
    return(

        <div class="column is-vcentered is-narrow">
            <div class="has-text-centered">
                <figure class="image is-128x128 image_placement">
                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                </figure>
                <p class="playlist_name">Vamp Anthem</p>
                <p class="playlist_subtitles"> University of Maryland</p>
                <p class="has-text-weight-light playlist_subtitles">@Pinex08</p>
            </div>
        </div>        

    )
}