export const getAlbums = async (token) => {
  return fetch("https://api.spotify.com/v1/albums/4ktDOYU0Jual1ELFTPhFd6", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
};

export const getPlaylist = async (token) => {
  return fetch("https://api.spotify.com/v1/playlists/37i9dQZF1EIVJaSOpyVhMw", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};

export const searchTracks = async (token, search) => {
  return fetch(
    `https://api.spotify.com/v1/search?q=track:${search}&type=track&include_external=audio&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((response) => {
    return response.json();
  });
};

export const searchGenreTracks = async (token, search) => {
  return fetch(
    `https://api.spotify.com/v1/search?q=genre:${search}&type=track&include_external=audio&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((response) => {
    return response.json();
  });
};
