import prisma from '../../lib/db/prisma'
import sendConfirmationEmail from '../../lib/school_email_verification/sendConfirmEmail'




// Checks to see if the email is valid format
function ValidateEmail(mail) {
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    
    return (false)
}



// Gets the domain from the email 
function getDomainFromEmail(email) {

    let emailDomain = null;
    const pos = email.search('@'); // get position of domain
    if (pos > 0) {
      emailDomain = email.slice(pos); // use the slice method to get domain name
    }
    return emailDomain;


}



// Does a database search to find domain name 
async function getSchoolInfoFromDomainInDatabase(college){

    //Searches the school database to find the unique domain name 
    const result = await prisma.schools.findUnique({
        where:{
            name: college
        }
    }).catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })


    console.log('School Information Found:    ' + result)

    return result

}



// Get user information 
async function getUserIdInfo(username){

    const userInfo = await prisma.$queryRaw`SELECT * FROM kickback.users 
    WHERE name = ${username};`  
    .catch(e => {
         throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

    const user_id = userInfo[0].id

    console.log('successfuly found user id')


    return user_id


}





//Update user information in user table in database 
// Input their school choice and school email 
async function updateUserInformationWithSchoolandSchoolEmail(user_id,school,school_email){



    const updateUser = await prisma.user.update({
        where: {id: user_id},
        data: {
            school: school, 
            schoolEmail: school_email
            },

    })
    .catch(e => {
        throw e
   })
   .finally(async () => {
       await prisma.$disconnect()
   })




    console.log('Successfully updated the users profile with School ' + school + ' and Email ' + school_email)

    return true 

}


//Generates a random string of characters 
const generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };





// Update the schoolemailverification table in database to upload user data and create a static path so
// user can confirm email 

async function createUserInSchoolEmailVerification(user,email,randomString){

    const createUser = await prisma.schoolemailverification.create({
        data:{
            user_name:user,
            school_email:email,
            random_school_index: randomString,

        }
    }).catch(e => {
        throw e
   })
   .finally(async () => {
       await prisma.$disconnect()
   })



    console.log('Successfuly created a user in schoolemailverification table. User: ' + user + ' School Email: ' + email + ' Random String: ' + randomString )


    return true 
}












async function emailInformation(email,school,username){

    console.log('Made it to Function')
    const isEmailValid = ValidateEmail(email)

    const college = school 
    const user = username
    const userEmail = email 

        
    if (isEmailValid){

        // If the email is valid now strip the domain and do a database search 
        const EmailDomain = getDomainFromEmail(email)
        console.log('Domain Name is: ' + EmailDomain)

        //Gets the school information based off the school name selected
        const school = await getSchoolInfoFromDomainInDatabase(college)
        
        // Checks to make sure we received school information 
        // If we dont then it will return false 
        if(school != null) {


            // Emails set into their own variables ex   email: '@terpmail.umd.edu' alt_email: '@umd.edu'
            const schoolEmail = school.email
            const schoolAltEmail = school.alt_email
            

            // Checks to see whether the email is either the email or alt domain 
            if (EmailDomain === schoolEmail || EmailDomain === schoolAltEmail ){
                console.log('Email was found in school emails')
                
                

                //Get User ID 
                const user_id = await getUserIdInfo(user)

                // Update the user information in the database 
                const update_status = await updateUserInformationWithSchoolandSchoolEmail(user_id,college,userEmail)
                
                // Generate a random string 
                const random_string = await generateRandomString(32)

                //Create user in schoolemailverification table to create static path 
                const create_verification_user = await createUserInSchoolEmailVerification(user,userEmail,random_string)


                //Verification link to confirm email 
                const verification_link = await process.env.NEXTAUTH_URL + '/school_email_verification/' + random_string + '?name=' + user


                // Add the user parm to the url verification_link to then be able to access it through query in the confirmation static path 


                //Send verification link to user email 
                const send = await sendConfirmationEmail(email,verification_link)





                console.log('Check Inbox')
                
                







                return true


            } else {
                console.log('Email is not apart of any of the school options')

                return false
            }

        } else {

            console.log('No School Information Was Found')
            return false 
        }

     



    } else {



        // Send invalid as the result and ending the process 
        console.log('Email Is Invalid')

        return false 
    }

}



export default emailInformation