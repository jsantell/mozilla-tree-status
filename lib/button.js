const { ActionButton } = require('sdk/ui/button/action');
const Prefs = require("sdk/simple-prefs");
const { on } = require("sdk/event/core");
const tabs = require("sdk/tabs");
const { getIcon, getURL } = require("./utils");

let button = ActionButton({
  id: "tree-status-button",
  icon: "./tree_warning.svg",
  label: "status unknown",
  onClick: () => {
    Prefs.prefs.enabled = !Prefs.prefs.enabled
    if (Prefs.prefs.enabled) {
      button.icon = getIcon();
    }
  }
});

function onData ({ status, tree, reason }) {
  let label = `${tree} status: ${status.toUpperCase()}`;
  if (reason) {
    label += `, ${reason}`;
  }
  button.label = label;
  button.icon = getIcon(status);
}

exports.observe = function (poller) {
  on(poller, "data", onData);
};
