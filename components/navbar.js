import 'bulma/css/bulma.css'
import React, { useState } from "react"
import { signIn, signOut, useSession } from 'next-auth/client'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { title } from 'process';








export default function Navbar({ providers }){

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
										options={top100Films}
										getOptionLabel={(option) => option.title}
										style={{ width: 300 }}
										renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
										onChange={(event, value) => schoolChoice(value)}
										/>
										
										<div class="block" style={{marginTop:"4em"}}>
											<p class=""> Enter your school email </p>
											<input class="input is-info block" type="text" placeholder="ex kickback@kyleroger.uni.edu" onChange={event => setSchoolEmail(event.target.value)}></input>
										</div>



									</section>

									<footer class="modal-card-foot">
										<button class="button is-success" onClick={() => userSchoolEmail(schoolEmail)}>Send Email</button>
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







const schoolChoice = function(school){
	if (school != null){
		console.log(school.title)
	} else {
		console.log('Enter a School')
	}
}

const userSchoolEmail = function(email,school){
	if(email != null){
		console.log(email)
	} else {
		console.log('No Email was entered')
	}
}




// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
	{ title: 'The Godfather: Part II', year: 1974 },
	{ title: 'The Dark Knight', year: 2008 },
	{ title: '12 Angry Men', year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: 'Pulp Fiction', year: 1994 },
	{ title: 'The Lord of the Rings: The Return of the King', year: 2003 },
	{ title: 'The Good, the Bad and the Ugly', year: 1966 },
	{ title: 'Fight Club', year: 1999 },
	{ title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
	{ title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
	{ title: 'Forrest Gump', year: 1994 },
	{ title: 'Inception', year: 2010 },
	{ title: 'The Lord of the Rings: The Two Towers', year: 2002 },
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: 'Goodfellas', year: 1990 },
	{ title: 'The Matrix', year: 1999 },
	{ title: 'Seven Samurai', year: 1954 },
	{ title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
	{ title: 'City of God', year: 2002 },
	{ title: 'Se7en', year: 1995 },
	{ title: 'The Silence of the Lambs', year: 1991 },
	{ title: "It's a Wonderful Life", year: 1946 },
	{ title: 'Life Is Beautiful', year: 1997 },
	{ title: 'The Usual Suspects', year: 1995 },
	{ title: 'Léon: The Professional', year: 1994 },
	{ title: 'Spirited Away', year: 2001 },
	{ title: 'Saving Private Ryan', year: 1998 },
	{ title: 'Once Upon a Time in the West', year: 1968 },
	{ title: 'American History X', year: 1998 },
	{ title: 'Interstellar', year: 2014 },
	{ title: 'Casablanca', year: 1942 },
	{ title: 'City Lights', year: 1931 },
	{ title: 'Psycho', year: 1960 },
	{ title: 'The Green Mile', year: 1999 },
	{ title: 'The Intouchables', year: 2011 },
	{ title: 'Modern Times', year: 1936 },
	{ title: 'Raiders of the Lost Ark', year: 1981 },
	{ title: 'Rear Window', year: 1954 },
	{ title: 'The Pianist', year: 2002 },
	{ title: 'The Departed', year: 2006 },
	{ title: 'Terminator 2: Judgment Day', year: 1991 },
	{ title: 'Back to the Future', year: 1985 },
	{ title: 'Whiplash', year: 2014 },
	{ title: 'Gladiator', year: 2000 },
	{ title: 'Memento', year: 2000 },
	{ title: 'The Prestige', year: 2006 },
	{ title: 'The Lion King', year: 1994 },
	{ title: 'Apocalypse Now', year: 1979 },
	{ title: 'Alien', year: 1979 },
	{ title: 'Sunset Boulevard', year: 1950 },
	{ title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
	{ title: 'The Great Dictator', year: 1940 },
	{ title: 'Cinema Paradiso', year: 1988 },
	{ title: 'The Lives of Others', year: 2006 },
	{ title: 'Grave of the Fireflies', year: 1988 },
	{ title: 'Paths of Glory', year: 1957 },
	{ title: 'Django Unchained', year: 2012 },
	{ title: 'The Shining', year: 1980 },
	{ title: 'WALL·E', year: 2008 },
	{ title: 'American Beauty', year: 1999 },
	{ title: 'The Dark Knight Rises', year: 2012 },
	{ title: 'Princess Mononoke', year: 1997 },
	{ title: 'Aliens', year: 1986 },
	{ title: 'Oldboy', year: 2003 },
	{ title: 'Once Upon a Time in America', year: 1984 },
	{ title: 'Witness for the Prosecution', year: 1957 },
	{ title: 'Das Boot', year: 1981 },
	{ title: 'Citizen Kane', year: 1941 },
	{ title: 'North by Northwest', year: 1959 },
	{ title: 'Vertigo', year: 1958 },
	{ title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
	{ title: 'Reservoir Dogs', year: 1992 },
	{ title: 'Braveheart', year: 1995 },
	{ title: 'M', year: 1931 },
	{ title: 'Requiem for a Dream', year: 2000 },
	{ title: 'Amélie', year: 2001 },
	{ title: 'A Clockwork Orange', year: 1971 },
	{ title: 'Like Stars on Earth', year: 2007 },
	{ title: 'Taxi Driver', year: 1976 },
	{ title: 'Lawrence of Arabia', year: 1962 },
	{ title: 'Double Indemnity', year: 1944 },
	{ title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
	{ title: 'Amadeus', year: 1984 },
	{ title: 'To Kill a Mockingbird', year: 1962 },
	{ title: 'Toy Story 3', year: 2010 },
	{ title: 'Logan', year: 2017 },
	{ title: 'Full Metal Jacket', year: 1987 },
	{ title: 'Dangal', year: 2016 },
	{ title: 'The Sting', year: 1973 },
	{ title: '2001: A Space Odyssey', year: 1968 },
	{ title: "Singin' in the Rain", year: 1952 },
	{ title: 'Toy Story', year: 1995 },
	{ title: 'Bicycle Thieves', year: 1948 },
	{ title: 'The Kid', year: 1921 },
	{ title: 'Inglourious Basterds', year: 2009 },
	{ title: 'Snatch', year: 2000 },
	{ title: '3 Idiots', year: 2009 },
	{ title: 'Monty Python and the Holy Grail', year: 1975 },
  ];