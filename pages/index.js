import Head from 'next/head'
import Navbar from '../components/navbar.js'
import IndexLayout from '../components/home/index_layout.js'
import { schools } from '../lib/db/getListOfSchools'
import { TopTen } from '../lib/playlists/getTopTen'
import 'bulma/css/bulma.css'




function Home({colleges, NorthEastTop, WestTop, SouthEastTop, SouthWestTop, MidWestTop }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
		    <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Kickback</title>
      
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css"></link>
      </Head>


      <Navbar listOfSchools={colleges}/>
      <IndexLayout  NorthEastTop={NorthEastTop} WestTop={WestTop} SouthEastTop={SouthEastTop} SouthWestTop={SouthWestTop} MidWestTop={MidWestTop} />
      
    </>
  )
}






export async function getStaticProps(context) {

  //Make a database request to get all the schools 
  const school = await schools()
  const colleges = school.schools


  

  // TOP 10 PER REGIONS PER 7 days 
  const days = 15

  //  North East 
  const NorthEastTop = await TopTen('NE',days)

  // West 
  const WestTop = await TopTen('W',days)

  // South East 
  const SouthEastTop = await TopTen('SE',days)

  // South West 
  const SouthWestTop = await TopTen('SW',days)

  // Mid West 
  const MidWestTop = await TopTen('MW',days)


  


  
  if (colleges != null){


    return {
      props: {colleges, NorthEastTop, WestTop, SouthEastTop, SouthWestTop, MidWestTop }, // will be passed to the page component as props
    }


  } else {

    const colleges =  { name: 'Error Loading Schools' };
    return{
      props:{colleges}
    }
  }
}



export default Home