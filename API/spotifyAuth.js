const client_id = "f0dab5f6825a4357bf322993dd2397dc";
const redirect_uri = "https%3A%2F%2Fdaniil609.github.io%2Fspotify%2F";
const unencoded_redirect_uri = "https://daniil609.github.io/spotify";
const scopes = "playlist-read-private";


export const login = async () => {
  window.open(
    `https://accounts.spotify.com/ru/authorize?client_id=${client_id}&scopes=${scopes}&response_type=code&redirect_uri=${redirect_uri}`
  );
};

export const spotifyAuthorization = async (code) => {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      code: code,
      redirect_uri: unencoded_redirect_uri,
      grant_type: "authorization_code",
    }),
    headers: {
      Authorization: "Basic " + btoa(client_id + ":" + "8ca86dd3c8b24a26a7df203a3506b089"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => response.json());

};

