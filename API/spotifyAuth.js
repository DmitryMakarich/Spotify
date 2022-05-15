export const client_id = "1d39bb81a5a0498ba8fa520e98b1e378";
export const redirect_uri = "https%3A%2F%2Fdaniil609.github.io%2Fspotify%2F";
export const scopes = "playlist-read-private";

export const login = async () => {
  return fetch(
    `https://accounts.spotify.com/ru/authorize?client_id=${client_id}&scopes=${scopes}&response_type=code&redirect_uri=${redirect_uri}`
  );

    // window.open(
    //   `https://accounts.spotify.com/ru/authorize?client_id=${client_id}&scopes=${scopes}&response_type=code&redirect_uri=${redirect_uri}`
    // );
};
