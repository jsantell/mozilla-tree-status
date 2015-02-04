const poller = require("./poller");
const button = require("./button");
const notify = require("./notify");

notify.observe(poller);
button.observe(poller);
