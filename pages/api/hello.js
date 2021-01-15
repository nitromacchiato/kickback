




export default async function handler(req, res) {
  
  res.statusCode = 200



  console.log('Trying again')
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ name: 'andy' })
}
