import * as querystring from "querystring";
import prisma from '../../../../lib/db/prisma'
import { getSession } from 'next-auth/client'

export default async function handler(req: any, res: any) {

  
  try {
    
    //const session = await fetch('http://localhost:3000/api/user/getUserName')
    

    // Request access to database and find userId
    const result = await prisma.account.findMany({
        where: {
          providerAccountId: {
            equals: 'pinex08',
          },
        },
      })
      .catch(e => {
            throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
    })
      







    const refresh_token = await result[0]['refreshToken']

    const spotifyUrl = "https://accounts.spotify.com/api/token";

    // Generate a base64 encoded string that contains the client ID and client secret
    // The field must have the format: Authorization: Basic *<base64 encoded client_id:client_secret>*
    const buff = Buffer.from(
      process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

    const getAccessToken = async () => {
      const response = await fetch(spotifyUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${buff}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify({
          grant_type: "refresh_token",
          refresh_token: refresh_token,
        }),
      });

      const resJson = await response.json();
      return res.status(200).json(resJson);
    };

    return getAccessToken();
  } catch (error) {
    console.error("Error Occurred Getting Top Songs:", error);
    return res.status(400);
  }
}