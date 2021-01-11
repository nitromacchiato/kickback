// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// lib/prisma.ts

export default async function (req, res) {
  
  const response = await fetch('http://localhost:3000/api/spotify/user/getUserId');
  //const data = await response.json();


  res.statusCode = 200
  console.log(response)

}
