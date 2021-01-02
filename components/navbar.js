import 'bulma/css/bulma.css'
import React, { useState } from "react"


export default function Navbar(){

    const [isActive, setisActive] = React.useState(false);



    return(
        
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>

					<div class="navbar-brand">

					  	<a class="navbar-item" href="">
					      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
					    </a>

					    <a role="button" className={`navbar-burger burger ${isActive ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" onClick={() => {setisActive(!isActive);}}>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
				    </div>


				  
				    <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>

					  	
					  	<div class="navbar-start">
					  		<div class="navbar-item">
						  		<div class="control has-icons-left has-icons-right my-2">
								  <input class="input is-normal" type="email" placeholder="Search" />
								  <span class="icon is-small is-left">
								    <i class="fas fa-search"></i>
								  </span>
								</div>
							</div>
						</div>

						
						 <div class="navbar-end">
					      <div class="navbar-item">
					        <div class="buttons">
					          <a class="button is-primary">
					            <strong>Login w/ Spotify</strong>
					          </a>
					          <a class="button is-light">
					            Add Playlist
					          </a>
					        </div>
					      </div>
					    </div>


				    </div>
				</nav>

    )
}