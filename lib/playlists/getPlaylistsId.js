import prisma from '../../lib/db/prisma'

 

// Get each id for schools in the database under the table schools 

export default async function getPlaylistIds(){

    // Process Log 
    console.log('Getting all playlists id')



    const database_name = "playlists"
    
    // Make a request to the database 
    const result = await prisma.$queryRaw('SELECT * FROM '+database_name+';')
    .catch(e => {
          throw e
      })
    .finally(async () => {
      await prisma.$disconnect()
    })
  
    // Create a params structure to hold ID's to match Nextjs static path requirement format 
    const id_numbers = await result.map(id => {
            
            //strip all white space from school name and add a dash
            const playlistID = id.playlist_id




            return {
                params:{
                    id: playlistID,  
                }
            }
        }
  
    )
  
    
    //Process Log 
    console.log('Successfully recieved all playlist ids')
    
    return id_numbers
  
  
  
  
  
  
  }