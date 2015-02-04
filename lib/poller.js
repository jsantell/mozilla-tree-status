const Prefs = require("sdk/simple-prefs");
const { get } = require("./request");
const { emit } = require("sdk/event/core");
const { EventTarget } = require("sdk/event/target");
const { setTimeout, clearTimeout } = require("sdk/timers");
const URL = "https://treestatus.mozilla.org/?format=json";

let target = module.exports = EventTarget();
let timeout = null;

poll();

function poll () {
  get(URL).then(json => {
    let data = json && json[Prefs.prefs.tree];
    if (data) {
      emit(target, "data", data);
    }
  });

  timeout = setTimeout(poll, Prefs.prefs.frequency * 60 * 1000);
}

function resetPoll () {
  clearTimeout(timeout);
  poll();
}

Prefs.on("tree", resetPoll);
Prefs.on("frequency", resetPoll);
