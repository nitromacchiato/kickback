




export default async function handler(req, res) {
  res.statusCode = 200

  const response = await fetch('http://localhost:3000/api/user/getUserName')
  const data = response.json()

  console.log(data)

  res.setHeader('Content-Type', 'application/json')
  res.send(data)
}
