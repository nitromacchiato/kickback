import 'bulma/css/bulma.css'
import React, { useState } from "react"
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import getUserPlaylist from "../lib/getUserPlaylist"







export default function Navbar({ providers }){

	const [isActive, setisActive] = React.useState(false);

	const [isShown, isHidden] = React.useState(false);

	const [ session, loading ] = useSession(); 

	





















    return(
		<>
        <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>
        <nav class="navbar" role="navigation" aria-label="main navigation">
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
							<i class="fas fa-search fa-lg"></i>
							</span>
						</div>
					</div>
				</div>

						
				<div class="navbar-end">
					<div class="navbar-item">
						<div class="buttons">


							{!session && 
							
								<button class="button is-primary" onClick={() => {isHidden(!isShown);}}>
									<strong>Connect</strong>
								</button>

							}


							{session &&
							<>
								<button class="button is-warning">{session.accessToken} </button>
								{console.log(session)}
								<button class="button is-warning" onClick={signOut}>
									<strong>Sign Out</strong>
								</button>
							</>
							}




							



							<a class="button is-danger">
							<strong>Donate</strong>
							</a>


							<div class={`modal ${isShown ? "is-active" : ""}`}>
								<div class="modal-background"></div>
								<div class="modal-content">
									<div class="box is-primary has-text-centered">

										<div class="is-right small_height">
											<button class="button is-white exit_icon" onClick={() => {isHidden(!isShown);}}>
												<span class="icon is-small">
													<i class="fas fa-times"></i>
												</span>
											</button>
										</div>
										
										<div class="block">
											<p class="title">Connect Account</p>
											<p class="subtitle">To follow, add and sync playlist you must connect with your music provider</p>
										</div> 


										<div class="block">
											
											
											
											<button class="button is-success is-rounded" onClick={e => { e.preventDefault(); signIn('spotify') }}>
												<span class="icon">
													<i class="fab fa-spotify"></i>
												</span>
												<span>
													Spotify
												</span>
											</button>
											
											
											
																				
										</div>							
																			
									</div>

								</div>
								
							</div>


						</div>
					</div>
				</div>
		     </div>
		</nav>

		</>


    )
}