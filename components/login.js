import 'bulma/css/bulma.css'
import React, { useState } from "react"






export default function LoginPopup(){

    const [isShown, isHidden] = useState(false);
	const showLogin = () => {
		isShown(true);
	}
	const closeLogin =() => {
		isShown(false);
	}

    const LoginPopupScreen = () => (isShown ? {display:'visible'}: " ")
    
    
    return(

        <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
            <p>Login</p>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick={this.handleClick}></button>
        </div>

    )
}