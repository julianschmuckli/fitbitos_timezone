import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { locale } from "user-settings";
import { me } from "companion";

let KEY_TIMEZONE = "timezone";
let KEY_TIMEZONE_NAME = "timezoneName";
let KEY_HOME = "home";

//Translations
let language = locale.language;

// Settings have been changed
settingsStorage.onchange = function(evt) {
  console.log("Settings changed");
  sendValue(evt.key, evt.newValue);
}

// Settings were changed while the companion was not running
if (me.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendValue(KEY_TIMEZONE, settingsStorage.getItem(KEY_TIMEZONE));
  sendValue(KEY_TIMEZONE_NAME, settingsStorage.getItem(KEY_TIMEZONE_NAME));
  sendValue(KEY_HOME, settingsStorage.getItem(KEY_HOME));
}

function sendValue(key, val) {
  if (val) {
    console.log(val);
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}
function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}