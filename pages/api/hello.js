// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {schools} from "../../lib/db/getListOfSchools"


export default async function (req, res) {
  
  
	const school = await schools()
	


    console.log(school)
    res.send(school.schools)

}
