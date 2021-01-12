



export async function schools() {

    //Make a database request to get all the schools 
    const getSchool = await fetch("api/hello")
    const schools = await getSchool.json()


    console.log(schools)
    return schools.name

}