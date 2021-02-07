import 'bulma/css/bulma.css'
import React from "react"
import Link from 'next/link'


export default function SentEmail({email}){


    return(


        <>
            <section className="hero is-link is-fullheight ">


                <div className="hero-body" style={{margin:'0 auto 0 auto'}}>

                    <div className="container">

                        <div className="notification  is-light has-text-centered" style={{height:'120px',width:'300px'}}>
                            
                            <Link href="http://localhost:3000/">
                                <button className="delete"></button>
                            </Link>

                            <p>
                                A confirmation has been sent to your email address. Please check your inbox or spam folder. 
                            </p>
                            
                           
                        </div>
                    </div>

                </div>



            </section>






        </>



    )
}