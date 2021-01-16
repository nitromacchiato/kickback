import * as querystring from "querystring";

export default function getRefreshToken(accessToken) {
  try {
    const refresh_token = 'accessToken';

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

      return resJson;
    };

    return getAccessToken();
  } catch (error) {
    console.error("Error Occurred Getting Top Songs:", error);
    return false;
  }
}