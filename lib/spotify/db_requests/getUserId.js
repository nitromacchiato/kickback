import { getSession } from 'next-auth/client'




export default async getUser(req, res) => {
  const session = await getSession({ req })
  if (session) {
    // Signed in
    console.log('Session', JSON.stringify(session, null, 2))
    res.send(session.user['name'])
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}