export default function handler(req: any, res: any) {
    try {
      const access_token = "BQDOgf-Mx2O2PLuj8fKR4KcLA-k5NOHhppQSw1XEs_Psuqx_1psha8oG8EmXowoQWWjakCNsWsTdaG6DTXGhX1T7834dSQySTol2q0owSe10ieT0OKvPB41eM5KP3tuQc-4zz_XhY5O3UaMECEom2ErjVsCp9e5-oay-tJgnh--rmLlzv5dDqZlxr6OUftCkk-SNRhPP1r5XA8nSXu39Rvup0DvP2KD2VI-vBijEeY9y9w"
      const ENDPOINT = `	https://api.spotify.com/v1/me/playlists?limit=50`;
  
      const getData = async () => {
        const playlistData = await fetch(ENDPOINT, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
  
        const { items } = await playlistData.json();
  
        const playlists = items.map((playlist: any) => ({
          image: (playlist.images || [])[0]?.url,
          name: playlist.name,
          description: playlist.description,
          owner: playlist.owner.display_name,
          id: playlist.id,
          tracksHref: playlist.tracks.href,
          tracksNumber: playlist.tracks.total,
          url: playlist.external_urls.spotify,
        }));
  
        if (playlists) {
          return res.status(200).json(playlists);
        }
      };

      return getData();


    } catch (error) {

      
      console.error("Error Occurred Getting Playlists:", error);
      return res.status(400);
    }
  }