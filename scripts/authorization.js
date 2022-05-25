import { login } from "../API/spotifyAuth.js";

const btn = document.getElementById("login-btn");

btn.onclick = async (e) => {
  await login();
};
