import { spotifyAuthorization } from "../API/spotifyAuth.js";

const header = document.getElementById("home-header");
const main = document.getElementById("home-main");
const footer = document.getElementById("home-footer");
const loader = document.getElementById("loader");

document.addEventListener("DOMContentLoaded", () => {
  var paramsString = document.location.search;
  var searchParams = new URLSearchParams(paramsString);

  const code = searchParams.get("code");

  spotifyAuthorization(code).then((data) => {
    console.log("data", data);

    if (data.access_token) {
      console.log("auth");

      //   window.localStorage.setItem("accessToken", data.access_token);
      //   window.localStorage.setItem("refreshToken", data.refresh_token);
      //   window.localStorage.setItem("expireIn", data.expires_in);

      document.body.removeChild(loader);
      header.style.display = "flex";
      main.style.display = "flex";
      footer.style.display = "block";
    }
  });
});
