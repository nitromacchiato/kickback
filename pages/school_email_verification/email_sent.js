import Head from 'next/head'
import Navbar from '../../components/navbar.js'
import IndexLayout from '../../components/home/index_layout.js'
import { schools } from '../../lib/db/getListOfSchools'
import Link from 'next/link'
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
        <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"></script>
      </Head>


      <Navbar listOfSchools={colleges}/>
      <IndexLayout/>

      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content box has-text-centered" style={{width:"20em"}}>
            
            <div class="block" style={{marginLeft:"auto", marginRight:"auto"}}>
              <span class="icon">
                <i class="fas fa-check fa-2x"></i>
              </span>
            </div>

            <div class="block">
              <p class="title">Email Sent</p>
              <p class="subtitle">If your email is valid you will recieve a confirmation link. Please check your inbox or spam folder</p>
            </div>

        </div>
        <Link href="/">
          <button class="modal-close is-large" aria-label="close"></button>
        </Link>
      </div>

     
          


      
      


    </>
  )
}





export async function getServerSideProps(context) {

  //Make a database request to get all the schools 
  const school = await schools()
  const colleges = school.schools
  
    if (colleges != null){


      return {
        props: {colleges}, // will be passed to the page component as props
      }


    } else {

      const colleges =  { name: 'Error Loading Schools' };
      return{
        props:{colleges}
      }
    }
}



export default Home