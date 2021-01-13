import prisma from '../../lib/db/prisma'

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
    })


    console.log('School Information Found:    ' + result)

    return result

}








async function emailInformation(email,school){

    console.log('Made it to Function')
    const isEmailValid = ValidateEmail(email)

    const college = school 

        
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
                console.log('Email was in the school section')
                

                return EmailDomain


            } else {
                console.log('Email is not in there')

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