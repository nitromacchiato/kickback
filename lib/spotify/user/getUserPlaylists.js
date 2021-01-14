



async function getUserPlaylists(){



    const result = await fetch('http://localhost:3000/api/spotify/auth/getnewtoken')
    const accessToken = await result.json()

    console.log(accessToken)





}





export default getUserPlaylists