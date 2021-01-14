import Head from 'next/head'
import 'bulma/css/bulma.css'
import { getVerficationIds } from '../../lib/school_email_verification/getAllVerificationIds'
import { useRouter } from 'next/router'

function VerifySchoolEmail({session}) {


  	//Router to redirect user to pages 
	const router = useRouter()

  if (typeof window !== "undefined") {
    // browser code
    const params = new URLSearchParams(window.location.search)
    const username = params.get('name')
    console.log(username)

    if (username != null) {

      router.push({ pathname: '/api/schoolEmailVerification/confirmEmail', query: { username: username }})
  
    } else {
  
      router.push(href="/")
  
    }
      



  }







  return (
    <>
        <Head>
            <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>Kickback</title>

            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css"></link>
        </Head>


            
       
      

      
      


    </>
  )
}




export async function getStaticPaths() {

    // Gets the id's for the static site 
    const paths = await getVerficationIds()

    // return a list of paths for users that need to be authenticated
    return {
      paths,
      fallback: false
    }


  }


export async function getStaticProps(context) {

    //Gets the current users logged in information 
    // Returns null if no information is present 
    const session = '';

    return {
        props: {session}, // will be passed to the page component as props
    }
}




export default VerifySchoolEmail