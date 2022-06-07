function Router(routes) {
  try {
    if (!routes) {
      throw "error: routes param is mandatory";
    }
    this.constructor(routes);
    this.init();
  } catch (e) {
    console.error(e);
  }
}

Router.prototype = {
  routes: undefined,
  rootElem: undefined,
  constructor: function (routes) {
    this.routes = routes;
    this.rootElem = document.getElementById("app");
  },
  init: function () {
    let r = this.routes;
    (function (scope, r) {
      window.addEventListener("hashchange", function (e) {
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  },
  hasChanged: function (scope, r) {
    if (window.location.hash.length > 0) {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.htmlName);
          scope.addCss(route.styles);
          scope.addScripts(route.scripts);
        }
      }
    } else {
      for (let i = 0, length = r.length; i < length; i++) {
        let route = r[i];

        if (route.default) {
          scope.goToRoute(route.htmlName);
          scope.addCss(route.styles);
          scope.addScripts(route.scripts);
        }
      }
    }
  },
  goToRoute: function (htmlName) {
    (function (scope) {
      let url = "html/" + htmlName;

      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          scope.rootElem.innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    })(this);
  },
  addCss: function (css) {
    if (css.length === 0) {
      return;
    }

    const styles = document.getElementsByTagName("link");

    // console.log("styles", styles);

    for (let i = 0; i < styles.length; i++) {
      // console.log("delete", styles[i]);

      styles[i].remove();
    }

    css.map((name) => {
      const linkEl = document.createElement("link");
      linkEl.href = "css/" + name;
      linkEl.rel = "stylesheet";

      document.head.append(linkEl);
    });
  },
  addScripts: function (scripts) {
    if (scripts.length === 0) {
      return;
    }

    const existsScripts = document.scripts;

    for (let i = 0; i < existsScripts.length; i++) {
      if (
        existsScripts[i].src.includes("route.js") ||
        existsScripts[i].src.includes("router.js") ||
        existsScripts[i].src.includes("app.js")
      )
        continue;

      existsScripts[i].remove();
    }

    scripts.map((name) => {
      const scriptElem = document.createElement("script");

      scriptElem.src = "scripts/" + name;
      scriptElem.type = "module";
      scriptElem.async = true;

      document.body.append(scriptElem);
    });
  },
};

export default Router;
