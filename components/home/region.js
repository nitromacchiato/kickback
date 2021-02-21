import React, { useState } from "react"
import PlaylistTile from "../../components/tile.js"
import 'bulma/css/bulma.css'




function RegionTitle(){
    return(
        <div>
            <p className="title title_adjustment">East</p>
        </div>
    )
}
  

function RegionRow(){
    return(
        <>
        <RegionTitle />
        <div className="columns is-mobile is-vcentered region_column_adjustment">
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
            <PlaylistTile/>
        </div>
        </>
    )   
}


export default function RegionColumn(){
    return(
        
        <>
        <RegionRow/>
        <RegionRow/>
        <RegionRow/>
        <RegionRow/>

        </>


        
    )

}