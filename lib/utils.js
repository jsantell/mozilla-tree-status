const Prefs = require("sdk/simple-prefs");

function getIcon (status) {
  if (status === "open" || status === "closed") {
    return `./tree_${status}.svg`;
  }
  return "./tree_warning.svg";
}
exports.getIcon = getIcon;

function getURL () {
  return `https://treestatus.mozilla.org/${Prefs.prefs.tree}`;
}
exports.getURL = getURL;
