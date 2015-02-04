const { ActionButton } = require('sdk/ui/button/action');
const { on } = require("sdk/event/core");
const { EventTarget } = require("sdk/event/target");
const tabs = require("sdk/tabs");
const Prefs = require("sdk/simple-prefs");

let button = ActionButton({
  id: "tree-status-button",
  icon: "./tree_warning.svg",
  label: "status unknown",
  onClick: () => tabs.open({ url: getURL() })
});

function onData ({ status, tree, reason }) {
  button.label = `${tree} status: ${status.toUpperCase()}`;
  button.icon = getIcon(status);
}

function getIcon (status) {
  if (status === "open" || status === "closed") {
    return `./tree_${status}.svg`;
  }
  return "./tree_warning.svg";
}

function getURL () {
  return `https://treestatus.mozilla.org/${Prefs.prefs.tree}`;
}

exports.observe = function (poller) {
  on(poller, "data", onData);
};
