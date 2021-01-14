import getSchoolIds from '../../lib/school/getAllSchoolIds'
import getSchoolInfo from '../../lib/school/getSchoolData'








export default function Schools({school}){



    return(

        <>  

            <h2>Welcome To {school.name} Page</h2>
            <h3>{school.nickname}</h3>

        
        </>


    )
}




export async function getStaticPaths() {

    //Get all paths by school name
    const paths = await getSchoolIds() 
    

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params }) {

    //Remove dashes from school url name and turn it to original format 
    const school_name = params.id.split('-').join(' ')
    

    // Gets the school information for the current school 
    const school = await getSchoolInfo(school_name)
    

    return {
        props: {school}, // will be passed to the page component as props
    }
}

