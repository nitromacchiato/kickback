import 'bulma/css/bulma.css'
import React from "react"
import Link from 'next/link'


export default function VerfiedEmail({email}){


    return(


        <>
            <section class="hero is-success is-fullheight ">


                <div class="hero-body" style={{margin:'0 auto 0 auto'}}>

                    <div class="container">

                        <div class="notification is-success is-light has-text-centered" style={{height:'120px',width:'300px'}}>
                            
                            <Link href="http://localhost:3000/">
                                <button class="delete"></button>
                            </Link>

                            <p>
                                Your email <strong>{email}</strong> has been successfuly verified. Your school has now been added to your profile
                            </p>
                            
                           
                        </div>
                    </div>

                </div>



            </section>






        </>



    )
}