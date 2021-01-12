import Head from 'next/head'
import Navbar from '../components/navbar.js'
import IndexLayout from '../components/home/index_layout.js'
import { schools } from '../lib/db/getListOfSchools'
import 'bulma/css/bulma.css'




function Home({colleges}) {
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
      <IndexLayout />
      

      
      


    </>
  )
}





export async function getServerSideProps(context) {

  //Make a database request to get all the schools 
  const school = await schools()
  const colleges = school.schools
  
  return {
    props: {colleges}, // will be passed to the page component as props
  }
}



export default Home