const client_id = "930bd795ba644df0b70e0e0f838bbdca";
const redirect_uri = "https%3A%2F%2Fdaniil609.github.io%2Fspotify%2Fhtml%2Fhome.html";
const unencoded_redirect_uri = "https://daniil609.github.io/spotify/html/home.html";
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
      Authorization: "Basic " + btoa(client_id + ":" + "b28cf19380e94552a0d30d88b434fd92"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => response.json());

};

