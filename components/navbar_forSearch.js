import 'bulma/css/bulma.css'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Link from 'next/link'


   





export default function NavbarForSearch({ listOfSchools, search}){

	//Drop down burger menu 
	const [isActive, setisActive] = React.useState(true);

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
	
	//Show error message for school submission
	const [isShownError, isHiddenError] = React.useState(false);

	//Check to see if user email is verified 
	const [isVerified, setVerified] = React.useState(false)

	//Show user playlists 
	const [isShowingPlaylists, setPlaylists] = React.useState(false)



	//Router to redirect user to pages 
	const router = useRouter()




	//Handle Playlist Submission to school page 
	function handlePlaylistSubmission(PlaylistName,PlaylistOwner,PlaylistSpotifyID,PlaylistHref,UserSchool,PlaylistImage, Description){


		// Calls the api with a post request and submits the parameters in a body 
		fetch('http://localhost:3000/api/user/playlistSubmission',{
			method:'POST',
			body: JSON.stringify({
				name: PlaylistName,
				owner: PlaylistOwner,
				spotifyID: PlaylistSpotifyID,
				href: PlaylistHref,
				image: PlaylistImage,
				school: UserSchool, 
				description: Description,
			}),
			headers:{
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).catch(function (error){
			console.warn('Something went wrong adding the playlist.', error)
		})


		//Change add button to remove 


        // Hide the add button for playlist
        const addButtonID = PlaylistSpotifyID + "add"
        const addButton = document.getElementById(addButtonID)
        addButton.style.display="none"

        //Display the remove button for playlist
        const removeButtonID = PlaylistSpotifyID + "remove"
        const removeButton = document.getElementById(removeButtonID)
        removeButton.style.display="block"




	}


	//Handle Playlist remove from school page
	function RemovePlaylist(PlaylistSpotifyID){
		
		// Calls the api with a post request and submits the parameters in a body 
		fetch('http://localhost:3000/api/user/removePlaylist',{
			method:'POST',
			body: JSON.stringify({
				spotifyID: PlaylistSpotifyID,
			}),
			headers:{
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).catch(function (error){
			console.warn('Something went wrong adding the playlist.', error)
		})

		// Show the add button for playlist
		const addButtonID = PlaylistSpotifyID + "add"
		const addButton = document.getElementById(addButtonID)
		addButton.style.display="block"

		//Hide the remove button for playlist
		const removeButtonID = PlaylistSpotifyID + "remove"
		const removeButton = document.getElementById(removeButtonID)
		removeButton.style.display="none"

		
	}









	//Handle School Email Submit 
	function handleSchoolSubmission(school,email) { 


		// Validates user email is correct 
		if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))

			{

				//Reroute user to api to handle submission 
				router.push({ pathname: '/api/schoolEmailVerification/getSchoolSubmission', query: { email: schoolEmail, school: schoolChoice, username: session.user.name }})

			} else {

				//Display error message on form if email is invalid 
				isHiddenError(!isShownError)


			}
	}



	//Check to see if user has a school 
	useEffect(() => {  
		const handleJob = async() =>{
			const userData = await getSession()

			if(userData != null){
				const result = userData['user']['school_verified']
				

				if (result != null && result != 'false'){		
					setVerified(true)
		
				} else {
					setVerified(false)
				}
		
				

			} else {

				setVerified(false)

			}	
		}
	},[]);
	

 

	//Get the current value and pass it to the parent component (Search) to take the value and search for hits 
	function PassInput(){
		

		// Quick fix to use the document 
		useEffect(()=> {

			// Selects the input field from the search bar 
			let SearchInput = document.querySelector('input');
			
			//Gets the live time input 
			SearchInput.oninput = handleInput;
			
			//Runs this function with each input 
			function handleInput(e) {
				
				//Get The current value
				const value = e.target.value
				console.log('Input is',value.length)
				//Do a search for current input if the value is not empty
				if(value.length > 0){
					const results = search(value)
				}
					
				
			}



		})


		
	}

	
	// Check which playlist the user has already added to their school page
	// Will update everytime a user makes a submission or deletion of a playlist 
 
	useEffect(() => {  

		const handleJob = async() =>{
			const userData = await getSession()
		
			if(userData != null){

				//Get the added playlist from the current user session 
				const playlistAdded = userData['playlistAdded']
				
				if(playlistAdded != undefined) {
					
					//If there is any playlist added 
					if(playlistAdded.length > 0 ){
		
						//map each playlist 
						playlistAdded.map(item => {
					
							//Change the button to remove if the playlist is added already 
		
							
							//Hide the add button
							const addButtonID = item + "add"
							const addButton = document.getElementById(addButtonID)
							if(addButton != null ){
								addButton.style.display="none"
							}
		
							//Show the remove button 
							const removeButtonID = item + "remove"
							const removeButton = document.getElementById(removeButtonID)
							if(removeButton != null){
								removeButton.style.display="block"
							}
		
						
							
							
		
							
		
		
						})
		
					}
				}

			} 
		}
		
		
	}),[];

	








    return(
		<>


        <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>


		{/* Start of Navbar  */}
        <nav className="navbar" role="navigation" aria-label="main navigation">


			{/* Start of left Navbar */}
			<div className="navbar-brand">
				

				{/* Navbar Logo */}
				<Link href="/">
					<a className="navbar-item" href="">
						<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
					</a>
				</Link>




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
				<div className="navbar-start">
					<div className="navbar-item">
						<div className="control my-2">
							<input id="SearchInput"  className="input is-normal" type="email" placeholder="Search" autoFocus onInput={PassInput()}/>
						</div>
					</div>
				</div>


				{/* Right Side of Navbar  */}
				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">




							{/* If the user is not Logged in  */}
							{!session && 
							
								<button className="button is-primary" onClick={() => {isHidden(!isShown);}}>
									<strong>Connect</strong>
								</button>

							}




							{/* If the user is logged in */}
							{session &&

							<>	

								
								{/* If the user school email is not verified then show the add school button */}
								{!isVerified && 

									<button className="button is-primary" onClick={() => {isHidingSchool(!isShowingSchool);}}>
									<strong>Add School</strong>
									</button>

								
								}
								


								{/* If the user school email is verified then show a custom button with a href link to their school page */}

								{isVerified && 
									<>
									<Link href='http://localhost:3000/schools/University-of-Maryland'>
										<button className="button is-light">
											<span className="icon">
												<i className="fas fa-graduation-cap"></i>
											</span>
											<span>{session.user.school}</span>
										</button>
									</Link>
									
									<button className="button is-success" onClick={() => {setPlaylists(!isShowingPlaylists);}}>
										<span>Add a Playlist</span>
									</button>
									</>
								}


								<button className="button is-warning" onClick={signOut}>
									<strong>Sign Out</strong>
								</button>
							</>
							}





							{/* <!-- Modal popup to show user playlists --> */}
							<div  className={`modal ${isShowingPlaylists? "is-active": " "}  `}>
								<div className="modal-background"></div>
								<div className="modal-card" style={{width:"350px"}}>

									<header className="modal-card-head">
										<p className="modal-card-title">My Playlists</p>
										<button className="delete" aria-label="close" onClick={()=>{setPlaylists(!isShowingPlaylists);}}></button>
									</header>


									<section className="modal-card-body" style={{height:"auto"}}>

										{/* Table to hold playlists names and an add button */}

										<table className="table" style={{width:'300px'}}>


											<thead>
												<tr>
													<th>Name</th>
													<th></th>
												</tr>
											</thead>

											<tbody>
												{/* If the user is logged in and the session.playlist data greater than 0 then loop through their playlists data */}
												{session && 
													session.playlist != undefined && 
														session.playlist.map(item =>{

															return(
																<>
																
																<tr>
																	<td>{item.name}</td>

																	<td>
																		<span>

																			{/* Add Playlist Button */}
																			<button id={item.uri + 'add'} className='button is-small is-primary' onClick={e => {e.preventDefault();  handlePlaylistSubmission(item.name, item.owner.display_name,  item.uri, item.external_urls.spotify, session.user.school, item.images[0]['url'], item.description )}}>
																				ADD
																			</button>

																			{/* Remove Playlist button */}
																			<button id={item.uri + 'remove'} className='button is-small is-danger' style={{display:'none'}}  onClick={e => {e.preventDefault();  RemovePlaylist(item.uri)}}>
																				DEL
																			</button>
																			
																		</span>
																	</td>
																	
																</tr>	
																</>
															)
														})	
												}



											</tbody>

										</table>

									</section>

									<footer className="modal-card-foot">
										<p> Any playlist you add will only be uploaded to your school </p>

									</footer>

								</div>
							</div>


							{/* <!-- Modal popup to select school --> */}
							<div  className={`modal ${isShowingSchool? "is-active": " "}  `}>
								<div className="modal-background"></div>
								<div className="modal-card" style={{width:"350px"}}>

									<header className="modal-card-head">
										<p className="modal-card-title">Select School</p>
										<button className="delete" aria-label="close" onClick={()=>{isHidingSchool(!isShowingSchool);}}></button>
									</header>

									<section className="modal-card-body" style={{height:"auto"}}>
										{/* <!-- Content ... --> */}






										{/* Search Bar for School */}
										<div className='block'>
											<p className={`error_message_font_color ${isShownError ? " ": "hide_error_message"}`}>Pick a school and enter a valid email</p>
										</div>


										<Autocomplete
										id="combo-box-demo"
										disableClearable
										options={listOfSchools}
										getOptionLabel={(option) => option.name}
										style={{ width: 300 }}
										renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
										onChange={(event, value) => setSchoolChoice(value.name)}
										/>
										
										<div className="block" style={{marginTop:"4em"}}>
											<p className=""> Enter your school email </p>
											<input required className="input is-info block" type="email" placeholder="ex kickback@kyleroger.uni.edu" onChange={event => setSchoolEmail(event.target.value)}></input>
										</div>



									</section>

									<footer className="modal-card-foot">

										{/* Checks to see whether the user has entered a schoolemail and school choice */}
										{schoolEmail && schoolChoice &&
											<>
											{/* <button className="button is-success" onClick={() => {router.push({ pathname: '/api/schoolEmailVerification/getSchoolSubmission', query: { email: schoolEmail, school: schoolChoice }})}}>Send Email</button> */}
											<button className="button is-success" onClick={e => { e.preventDefault(); handleSchoolSubmission(schoolChoice,schoolEmail)}}>Submit</button>
											
											
											</>
										}

										



									</footer>

								</div>
							</div>


							{/* Modal Popup to connect to music provider. Only pops up when the user clicks the connect button */}
							<div className={`modal ${isShown ? "is-active" : ""}`}>
								<div className="modal-background"></div>
								<div className="modal-content">
									<div className="box is-primary has-text-centered">

										<div className="is-right small_height">
											<button className="button is-white exit_icon" onClick={() => {isHidden(!isShown);}}>
												<span className="icon is-small">
													<i className="fas fa-times"></i>
												</span>
											</button>
										</div>
										
										<div className="block">
											<p className="title">Connect Account</p>
											<p className="subtitle">To follow, add and sync playlist you must connect with your music provider</p>
										</div> 


										<div className="block">		
											<button className="button is-success is-rounded" onClick={e => { e.preventDefault(); signIn('spotify') }}>
												<span className="icon">
													<i className="fab fa-spotify"></i>
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


    

 








