import { spotifyAuthorization } from "../API/spotifyAuth.js";
import { getAlbums, getPlaylist } from "../API/spotifyApi.js";
import { getPauseSvg, getPlaySvg } from "../Utils/svg.js";

const header = document.getElementById("home-header");
const main = document.getElementById("home-main");
const footer = document.getElementById("home-footer");
const loader = document.getElementById("loader");
const app = document.getElementById("app");
const logoutBtn = document.getElementById("logout-link");
let isPlaing = false;

async function init() {
  const paramsString = document.location.search;
  console.log(paramsString);
  const searchParams = new URLSearchParams(paramsString);

  const accessToken = window.localStorage.getItem("accessToken");

  if (accessToken) {
    fetchData(accessToken);
    return;
  }

  const code = searchParams.get("code");
  const data = await spotifyAuthorization(code);

  console.log("data", data);

  if (data.access_token) {
    window.localStorage.setItem("accessToken", data.access_token);
    window.localStorage.setItem("refreshToken", data.refresh_token);
    window.localStorage.setItem("expireIn", data.expires_in);

    fetchData(data.access_token);
  }
}

await init();

async function fetchData(token) {
  app.removeChild(loader);
  header.style.display = "flex";
  main.style.display = "block";
  footer.style.display = "block";

  const albumData = await getAlbums(token);
  const playlistData = await getPlaylist(token);

  console.log("albumData", albumData);

  renderAlbums(albumData);
  renderPlaylist(playlistData);
}

function renderAlbums(albumData) {
  albumData.tracks.items.forEach((track) => {
    const album = document.createElement("span");
    album.classList.add("item__caption-item", "item__caption-item_albom");
    album.innerHTML = track.name;

    const author = document.createElement("span");
    author.classList.add("item__caption-item", "item__caption-item_author");
    author.innerHTML = track.artists[0].name;

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("item__caption-wrapper");
    figcaption.appendChild(author);
    figcaption.appendChild(album);

    const image = document.createElement("img");
    image.classList.add("item__avatar");
    image.src = albumData.images[0].url;

    const figure = document.createElement("div");
    figure.classList.add("item");
    figure.appendChild(image);
    figure.appendChild(figcaption);

    figure.innerHTML += getPlaySvg(`play${track.id}`);
    figure.innerHTML += getPauseSvg(`pause${track.id}`);

    document.getElementById("albums").appendChild(figure);
    document.getElementById("title").innerHTML = "Album: " + albumData.name;

    const playIcon = document.getElementById(`play${track.id}`);
    const pauseIcon = document.getElementById(`pause${track.id}`);

    playIcon.onclick = () => {
      const player = document.getElementById("player");

      player.src = track["preview_url"];
      player.load();
      player.play();
      isPlaing = true;

      playIcon.classList.remove("visible");
      pauseIcon.classList.add("visible");
    };

    pauseIcon.onclick = () => {
      const player = document.getElementById("player");

      player.pause();
      isPlaing = false;

      playIcon.classList.add("visible");
      pauseIcon.classList.remove("visible");
    };
  });
}

function renderPlaylist(playlistData) {
  playlistData.tracks.items.forEach((playlist) => {
    const album = document.createElement("span");

    album.classList.add("item__caption-item", "item__caption-item_albom");
    album.innerHTML = playlist.track.name;
    const author = document.createElement("span");
    author.classList.add("item__caption-item", "item__caption-item_author");
    author.innerHTML = playlist.track.artists[0].name;
    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("item__caption-wrapper");
    figcaption.appendChild(author);
    figcaption.appendChild(album);
    const image = document.createElement("img");
    image.classList.add("item__avatar");

    image.src = playlist.track.album.images[0].url;
    const figure = document.createElement("div");
    figure.classList.add("item");
    figure.appendChild(image);
    figure.appendChild(figcaption);

    figure.innerHTML += getPlaySvg(`play${playlist.track.id}`);
    figure.innerHTML += getPauseSvg(`pause${playlist.track.id}`);

    document.getElementById("playlists").appendChild(figure);
    document.getElementById("titleNew").innerHTML =
      "Playlist: " + playlistData.name;

    const playIcon = document.getElementById(`play${playlist.track.id}`);
    const pauseIcon = document.getElementById(`pause${playlist.track.id}`);

    playIcon.onclick = () => {
      const player = document.getElementById("player");

      player.src = playlist.track["preview_url"];
      player.load();
      player.play();
      isPlaing = true;

      playIcon.classList.remove("visible");
      pauseIcon.classList.add("visible");
    };

    pauseIcon.onclick = () => {
      const player = document.getElementById("player");

      player.pause();
      isPlaing = false;

      playIcon.classList.add("visible");
      pauseIcon.classList.remove("visible");
    };
  });
}

logoutBtn.onclick = (e) => {
  window.localStorage.removeItem("accessToken");
};
