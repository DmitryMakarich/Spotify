import { login } from "../API/spotifyAuth.js";

const form = document.getElementById("login-form");

form.onsubmit = async (e) => {
  e.preventDefault();

  await login();
};
