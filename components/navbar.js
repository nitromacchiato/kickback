import 'bulma/css/bulma.css'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import { signIn, signOut, useSession } from 'next-auth/client'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';









export default function Navbar({ listOfSchools }){

	//Drop down burger menu 
	const [isActive, setisActive] = React.useState(false);

	//Show modal card to connect to provider 
	const [isShown, isHidden] = React.useState(false);

	//Show modal card to select school 
	const [isShowingSchool, isHidingSchool ] = React.useState(false);

	//Check session for user to see if they're logged in with NextAuth 
	const [ session, loading ] = useSession(); 

	//User Email for school selection 
	const [schoolEmail, setSchoolEmail] = React.useState('')

	//User School selection 
	const [schoolChoice, setSchoolChoice] = React.useState('')
	


	//Router to redirect user to pages 
	const router = useRouter()













    return(
		<>
        <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>


		{/* Start of Navbar  */}
        <nav class="navbar" role="navigation" aria-label="main navigation">


			{/* Start of left Navbar */}
			<div class="navbar-brand">
				

				{/* Navbar Logo */}
				<a class="navbar-item" href="">
					<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
				</a>




				{/* Navbar Burger Menu Dropdown, only shows for max-width 768 and below */}
				<a role="button" className={`navbar-burger burger ${isActive ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" onClick={() => {setisActive(!isActive);}}>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
				
			</div>




			{/* Navbar Menu  */}
			<div className={`navbar-menu ${isActive ? "is-active" : ""}`}>

				{/* Searchbar for Navbar */}
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


				{/* Right Side of Navbar  */}
				<div class="navbar-end">
					<div class="navbar-item">
						<div class="buttons">




							{/* If the user is not Logged in  */}
							{!session && 
							
								<button class="button is-primary" onClick={() => {isHidden(!isShown);}}>
									<strong>Connect</strong>
								</button>

							}




							{/* If the user is logged in */}
							{session &&

							<>
								<button class="button is-primary" onClick={() => {isHidingSchool(!isShowingSchool);}}>
									<strong>Add School</strong>
								</button>




								<button class="button is-warning" onClick={signOut}>
									<strong>Sign Out</strong>
								</button>
							</>
							}

							
							{/* Donate Button */}
							<a class="button is-danger">
							<strong>Donate</strong>
							</a>


							{/* <!-- Modal popup to select school --> */}
							<div  class={`modal ${isShowingSchool? "is-active": " "}  `}>
								<div class="modal-background"></div>
								<div class="modal-card" style={{width:"350px"}}>

									<header class="modal-card-head">
										<p class="modal-card-title">Select School</p>
										<button class="delete" aria-label="close" onClick={()=>{isHidingSchool(!isShowingSchool);}}></button>
									</header>

									<section class="modal-card-body" style={{height:"auto"}}>
										{/* <!-- Content ... --> */}
							

										{/* Search Bar for School */}
										
										<Autocomplete
										id="combo-box-demo"
										options={listOfSchools}
										getOptionLabel={(option) => option.name}
										style={{ width: 300 }}
										renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
										onChange={(event, value) => setSchoolChoice(value.name)}
										/>
										
										<div class="block" style={{marginTop:"4em"}}>
											<p class=""> Enter your school email </p>
											<input class="input is-info block" type="text" placeholder="ex kickback@kyleroger.uni.edu" onChange={event => setSchoolEmail(event.target.value)}></input>
										</div>



									</section>

									<footer class="modal-card-foot">
										<button class="button is-success" onClick={() => {router.push({ pathname: '/api/schoolEmailVerification/getSchoolSubmission', query: { email: schoolEmail, school: schoolChoice }})}}>Send Email</button>
									</footer>

								</div>
							</div>






























							{/* Modal Popup to connect to music provider. Only pops up when the user clicks the connect button */}
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





const submitSchool = function(school,email){

	if(school != null || email != null ) {
		console.log(school.name)
		console.log(email)
		
	} else {
		persistForm()
	}

}
















