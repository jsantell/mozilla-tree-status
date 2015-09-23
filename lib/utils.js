const Prefs = require("sdk/simple-prefs");

function getIcon (status) {
  if (status === "open" ||
      status === "closed" ||
      status === "disabled") {
    return `./tree_${status}.svg`;
  }
  return "./tree_warning.svg";
}
exports.getIcon = getIcon;

function getURL () {
  return `https://api.pub.build.mozilla.org/treestatus/details/${Prefs.prefs.tree}`;
}
exports.getURL = getURL;
