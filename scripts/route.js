function Route(name, htmlName, styles, scripts, defaultRoute) {
  try {
    if (!name || !htmlName) {
      throw "error: name and htmlName params are mandatories";
    }
    this.constructor(name, htmlName, styles, scripts, defaultRoute);
  } catch (e) {
    console.error(e);
  }
}

Route.prototype = {
  name: undefined,
  htmlName: undefined,
  styles: [],
  scripts: [],
  default: undefined,
  constructor: function (name, htmlName, styles, scripts, defaultRoute) {
    this.name = name;
    this.htmlName = htmlName;
    this.styles = styles;
    this.scripts = scripts;
    this.default = defaultRoute;
  },
  isActiveRoute: function (hashedPath) {
    return hashedPath.replace("#", "") === this.name;
  },
};

export default Route;
