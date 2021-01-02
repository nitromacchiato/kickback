import 'bulma/css/bulma.css'
import 'bulma-divider'
import styles from '../../styles/Home.module.css'



function profileBox(){
    return(
        <>

        </>
    )
}











export default function Profile(){
    return(

        <div class="tile is-ancestor">

            
            <div class="tile is-parent is-vertical is-3">
                <div class="tile is-child box">

                    <div>
                        <figure class="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/640x480.png" />
                        </figure>
                    </div>

                    <div class={styles.top_padding}>
                        <p class="title has-text-centered">Andy Pineda </p>
                        <p class="subtitle has-text-centered has-text-weight-light"> @pinex08 </p>
                    </div>

                    <div class={styles.top_padding_divider}>
                        <div class="is-divider" data-content="My Playlist"></div>
                    </div>
                    
                </div>

            </div>

            
            <div class="tile is-parent">
                <div class="tile is-child box">
                    <p>Hello</p>
                </div>
            </div>


            
            <div class="tile is-parent is-vertical is-2">
                
                <div class="tile is-child box">
                    <p>Top Right</p>
                </div>
                
                <div class="tile is-child box">
                    <p>Bottom Right</p>
                </div>
            </div>
        </div>
        
    )
}