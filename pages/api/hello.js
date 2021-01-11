// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// lib/prisma.ts

import getUser from "../../lib/spotify/db_requests/getUserId"


export default async function (req, res) {

  const user = getUser()

  res.statusCode = 200
  res.json({ name: user })

}
