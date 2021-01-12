import Head from 'next/head'
import 'bulma/css/bulma.css'
import { useSession } from 'next-auth/client'
import VerfiedEmail from '../../components/schoolEmail/verified'



function VerifySchoolEmail({colleges}) {

    
	//Check session for user to see if they're logged in with NextAuth 
	const [ session, loading ] = useSession(); 




  return (
    <>
        <Head>
            <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>Kickback</title>

            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css"></link>
        </Head>


            

        <VerfiedEmail  email={colleges[0].email}/>
      

      
      


    </>
  )
}




export async function getStaticPaths() {
    const paths = [ {params: {id: '1'}}, {params: {id:'2'}}]



    return {
      paths,
      fallback: false
    }


  }


export async function getStaticProps(context) {

    //Make a database request to get all the schools 
    const colleges = [
        {
          school_id: 1,
          name: 'University of Maryland',
          email: '@terpmail.umd.edu',
          alt_email: '@umd.edu',
          nickname: 'terps'
        },
        {
          school_id: 2,
          name: 'Towson University',
          email: '@towson.students.edu',
          alt_email: '@towson.edu',
          nickname: 'tigers'
        },
        {
          school_id: 3,
          name: 'Morgan State University',
          email: '@morgan.state.edu',
          alt_email: null,
          nickname: 'bears'
        },
        {
          school_id: 4,
          name: 'Arizona University',
          email: '@arizona.edu',
          alt_email: null,
          nickname: 'wildcats'
        }
      ]

    return {
        props: {colleges}, // will be passed to the page component as props
    }
}




export default VerifySchoolEmail