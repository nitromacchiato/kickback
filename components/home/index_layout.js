import React, { useState } from "react"
import RegionColumn from "../../components/home/region.js"
import Ads from "./ad_section.js"
import 'bulma/css/bulma.css'













export default function IndexLayout(){

    return(
        <>
        <section class="section is-vcentered margin_section">
            <div class="columns is-centered">
                <div class="column is-9">
                    <RegionColumn />
                </div>
                <Ads/>


                
            </div>
            
            
        </section>
       </>
    )
}