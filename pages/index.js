import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar.js'
import IndexLayout from '../components/home/index_layout.js'
import 'bulma/css/bulma.css'




export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
		    <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Kickback</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css"></link>
      </Head>


      <Navbar />
      <IndexLayout />
      

      
      


    </>
  )
}
