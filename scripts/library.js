import { searchGenreTracks } from "../API/spotifyApi.js";
import { getPlaySvg, getPauseSvg } from "../Utils/svg.js";

const sortElement = document.getElementById("sort");
const noRecords = document.getElementById("no-sort-records");
let isPlaing = false;

sortElement.onchange = async (e) => {
  e.preventDefault();

  const selected = e.target.value;

  const token = window.localStorage.getItem("accessToken");

  const data = await searchGenreTracks(token, selected);

  console.info("data", data);

  if (data.tracks && data.tracks.items.length) {
    noRecords.style.display = "none";
    document.getElementById("tracks").innerHTML = "";

    data.tracks.items.forEach((track) => {
      const trackTitle = document.createElement("span");
      trackTitle.innerHTML = track.name;

      const author = document.createElement("span");
      author.innerHTML = track.artists[0].name;

      const figcaption = document.createElement("figcaption");
      figcaption.classList.add("music-grid__item__caption");
      figcaption.appendChild(trackTitle);
      figcaption.appendChild(author);

      const image = document.createElement("img");
      image.classList.add("music-grid__item__avatar");
      image.src = track.album.images[1].url;

      const figure = document.createElement("figure");
      figure.classList.add("music-grid__item");
      figure.appendChild(image);
      figure.appendChild(figcaption);

      figure.innerHTML += getPlaySvg(`play${track.id}`);
      figure.innerHTML += getPauseSvg(`pause${track.id}`);

      document.getElementById("tracks").appendChild(figure);

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

    return;
  }

  document.getElementById("tracks").innerHTML = "";
  noRecords.style.display = "flex";
};
