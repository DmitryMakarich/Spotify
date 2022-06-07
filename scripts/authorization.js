import { login } from "../API/spotifyAuth.js";

const btn = document.getElementById("login-btn");

function init() {
  var paramsString = document.location.search;
  var searchParams = new URLSearchParams(paramsString);

  const code = searchParams.get("code");

  if (code) {
    window.location.hash = "home";
  }
}

init();

btn.onclick = async (e) => {
  await login();
};
