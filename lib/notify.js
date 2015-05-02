const Prefs = require("sdk/simple-prefs");
const { on } = require("sdk/event/core");
const { notify } = require("sdk/notifications");
const { getIcon } = require("./utils");

let lastStatus = null;
let lastTree = null;

function displayNotification ({ status, tree, reason }) {
  notify({
    title: `${tree} tree is now ${status.toUpperCase()}`,
    text: reason,
    iconURL: getIcon(status)
  });
}

function onData ({ status, tree, reason }) {
  // If status changed on a tree previously queried (so to not trigger when
  // switching trees):
  if (Prefs.prefs.notify &&
      lastStatus && lastStatus !== status &&
      lastStatus != "disabled" &&
      status != "disabled" &&
      lastTree && lastTree === tree) {
    displayNotification({ status, tree, reason });
  }
  lastStatus = status;
  lastTree = tree;
}

exports.observe = function (poller) {
  on(poller, "data", onData);
};
