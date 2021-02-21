import prisma from '../db/prisma'



async function SearchForPlaylists(value){


    //Connect to database and do a search using the '%' (Matches one or more characters) wildcard 
    // Only selects the top 6 results 
    //Had to create a query string as a variable in order to be able to pass the value inbetween the sql wildcard without error 
    const addQuery = 'SELECT * FROM playlists WHERE name LIKE "%'
    const Query = addQuery.concat(value,'%" LIMIT 6;')
    
    const result = await prisma.$queryRaw(Query)
    .catch(e => {
        throw e
    })
   .finally(async () => {
       await prisma.$disconnect()
    })        



    return result

    //Returns 

    /*
    
    [ 
      {
        id: 119,
        name: 'Bizzy Banks',
        owner: 'bryan_713',
        school: 'University of Maryland',
        region: 'NE',
        playlist_id: 'spotify:playlist:0DdktqUXiYiUu0i9YUDuYr',
        external_href: 'https://open.spotify.com/playlist/0DdktqUXiYiUu0i9YUDuYr',
        cover_image: 'https://mosaic.scdn.co/640/ab67616d0000b27306d172b525dcb44427b70a1bab67616d0000b273223a6b785acdee47702df2c3ab67616d0000b2739a2eb75b04249396699e37b9ab67616d0000b273cc4e0a7fed50978b63cea5c5',
        total_followers: 164,
        follower_kickback: 0,
        uploadDate: '2021-02-02T08:44:23.728+00:00',
        updateDate: null,
        description: ''
      }
    ]
    
    */ 

}







async function SearchForSchools(value){

    //Connect to database and do a search using the '%' (Matches one or more characters) wildcard 
    // Only selects the top 6 results 
    //Had to create a query string as a variable in order to be able to pass the value inbetween the sql wildcard without error 
    const addQuery = 'SELECT * FROM schools WHERE name LIKE "%'
    const Query = addQuery.concat(value,'%" LIMIT 6;')
    
    const result = await prisma.$queryRaw(Query)
    .catch(e => {
        throw e
    })
   .finally(async () => {
       await prisma.$disconnect()
    })        



    return result


    //Returns 
    /*
        [
        {
            school_id: 1,
            name: 'University of Maryland',
            email: '@terpmail.umd.edu',
            alt_email: '@umd.edu',
            nickname: 'Terps',
            region: 'NE'
        }
        ]

    */

}







async function MainHits(value){

    // Only makes a search if the search value is more than a set amount of characters
    if(value.length > 2){

        //Get the playlists from the input value
        const Playlists = await SearchForPlaylists(value)

        //Get School hits 
        const Schools = await SearchForSchools(value)

        const results = await [{'Playlists':Playlists,'Schools':Schools}]
        
        return results

    } else {
        console.log('Search needs to be 2 characters or more')
    }

    


    /* RETURNS 

        [ { Playlists: [], Schools: [ [Object] ] } ]

    */ 
}






export default MainHits