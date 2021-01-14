// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from 'next-auth/client'


export default async (req, res) => {
	const session = await getSession({ req })
	if (session) {


	  // Signed in
      //console.log('Session', JSON.stringify(session, null, 2))
      console.log(session.user.name)
      const user_name = session.user.name
      


	} else {
	  // Not Signed in
	  res.status(401)
	}
	res.end()
  }