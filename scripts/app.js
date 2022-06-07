import Router from "./router.js";
import Route from "./route.js";

(function () {
  function init() {
    let router = new Router([
      new Route(
        "login",
        "login.html",
        ["login.css", "base.css"],
        ["authorization.js"],
        true
      ),
      new Route("home", "home.html", ["home.css", "base.css"], ["home.js"]),
      new Route(
        "account",
        "account.html",
        ["account.css", "base.css"],
        ["home.js"]
      ),
      new Route(
        "library",
        "library.html",
        ["library.css", "base.css"],
        ["library.js"]
      ),
      new Route(
        "search",
        "search.html",
        ["search.css", "base.css"],
        ["search.js"]
      ),
    ]);
  }
  init();
})();
