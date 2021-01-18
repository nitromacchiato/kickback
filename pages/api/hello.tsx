// Here is the file we want to make the Node JS Request for the user to login to.
import * as querystring from "querystring";
import * as dotenv from "dotenv";

dotenv.config();

export default function handler(req: any, res: any) {
  const userCode = 'BQBmCm5WUKny1nUgUgQRjBb8UgMSGxtJiVi5miN4H2aDSnj2MT8_XOCuD_46kT4GnnoQaYgslZGGbU---tf3WTWQQbE9ZMErlxjxaZb1tVCYNQxsc8VU096-Iv616OTMoOhz0vMbSyA0lZU1tY5PXb08P1_b2FqFubV3WiWVRqXuzlVTXE5fL0Wp9n4qREoECXatDsODfq-fCYBODiG1EEsbUGDS4BvVJUVePTKORG9fyg';

  try {
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
          grant_type: "authorization_code",
          code: userCode,
          redirect_uri: "http://localhost:3000/api/auth/callback/spotify",
        }),
      });

      const resJson = await response.json();

      return res.status(200).json(resJson);
    };

    return getAccessToken();
  } catch (error) {
    console.error(error);
    return null;
  }
}