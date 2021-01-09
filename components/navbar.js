import 'bulma/css/bulma.css'
import React, { useState } from "react"
import Link from 'next/link'









export default function Navbar({ providers }){

	const [isActive, setisActive] = React.useState(false);

	const [isShown, isHidden] = React.useState(false);

	


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


								
							<button class="button is-primary" onClick={() => {isHidden(!isShown);}}>
								<strong>Connect</strong>
							</button>




							



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
											
											<Link href="https://accounts.spotify.com/authorize?client_id=8e94bde7dd
												b84a1f7a0e51bf3bc95be8&response_type=code&redirect_uri=http
												%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing%20
												user-top-read">

											<button class="button is-success is-rounded">
												<span class="icon">
													<i class="fab fa-spotify"></i>
												</span>
												<span>
													Spotify
												</span>
											</button>
											</Link>
											
																				
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