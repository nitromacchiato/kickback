# Kickback 

Description about kickback 


## Table of Contents 
* [Dependencies](#dependencies)
* [Features](#features)

## Dependencies







## Features 
Able to share, stream and add music you discover. 

















<details>

<summary> Select Your School </summary> 
<p align="center">
 <img align="center" alt="start up" src="demo/listofschools.gif" />
</p>

1.First we load the data at build time by using getStaticProps from Nextjs. This allows us to get the list of schools 
and pass them to the component as a prop. 


```javascript
// pages/index.js 

export async function getStaticProps(context) {

//Make a database request to get all the schools 
const school = await schools()
const colleges = school.schools


if (colleges != null){

    return {
    props: {colleges,...}, // will be passed to the page component as props
    }

}else{

    const colleges =  { name: 'Error Loading Schools' };
    return{
    props:{colleges}
    }
}
}


```



2.  Pass the list of schools as a prop to our home component and passing our list of schools to 
our Navbar component. 

```javascript 
function Home({colleges, ...}) {
return (
    <>
    <Head>
        ...
        <title>Kickback</title>
        ...
    </Head>


    <body>
        <Navbar listOfSchools={colleges}/>
        ...
    </body>
    </>
)
}



```




3. We use the imported school function to make a query to the database and select all 
schools. 

```javascript 

// lib/db/prisma

export async function schools() {


    //Make a database request to get all the schools 
    const getSchool = await prisma.$queryRaw`SELECT * FROM kickback.schools;`
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })        

    
    return {
        schools:getSchool
    }


}

```



4. Using Material UI to display an autocomplete box by passing in the list of school props to the options parameter. 

```javascript 
    // components/navbar.js  


    <Autocomplete
    id="combo-box-demo"
    disableClearable
    options={listOfSchools}
    getOptionLabel={(option) => option.name}
    style={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
    onChange={(event, value) => setSchoolChoice(value.name)}
    />
    
    <div className="block" style={{marginTop:"4em"}}>
        <p className=""> Enter your school email </p>
        <input required className="input is-info block" type="email" placeholder="ex firstlast@name.uni.edu" onChange={event => setSchoolEmail(event.target.value)}></input>
    </div>


```
</detail>



<details>
<summary> Login </summary>
login
</details>


<details>
<summary> Email Confirmation </summary>
a
</details>


<details>
<summary> Add A Playlist </summary>
d
</details>


<details>
<summary> Follow/Unfollow A User/Playlist </summary>
d
</details>

<details>
<summary> Play Music </summary>
f
</details>


