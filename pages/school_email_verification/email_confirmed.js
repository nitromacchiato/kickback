import Head from 'next/head'
import 'bulma/css/bulma.css'
import VerfiedEmail from '../../components/schoolEmail/verified'



function VerifySchoolEmail({session}) {



    



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


              

        <VerfiedEmail  />
      

      
      


    </>
  )
}





export default VerifySchoolEmail