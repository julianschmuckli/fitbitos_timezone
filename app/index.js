import clock from "clock";
import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import { vibration } from "haptics";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const main = document.getElementById("main");
const other_timezone = document.getElementById("other_timezone");

const main_label = document.getElementById("main_label");
const other_timezone_label = document.getElementById("other_timezone_label");

var timezone = 0;
var timezone_name = "";
var home_name = "";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  //Calculate for home timezone
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  main.text = `${hours}:${mins}:${secs}`;
  
  //Calculate for different timezone
  let today = new Date(evt.date.valueOf() + evt.date.getTimezoneOffset() * 60000);
  today.setTime(today.getTime() + timezone * 60 * 60 * 1000);
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  other_timezone.text = `${hours}:${mins}:${secs}`;
}

/*
Load settings
*/

//Get timezone
try{
  timezone = fs.readFileSync("timezone.txt", "utf-8");
}catch(e){
  timezone = 0;
}

//Get name of different timezone
try{
  timezone_name = fs.readFileSync("timezoneName.txt", "utf-8");
}catch(e){
  timezone_name = "Different timezone";
}
setTimeZoneName(timezone_name);

try{
  home_name = fs.readFileSync("home.txt", "utf-8");
}catch(e){
  home_name = "Home";
}
setHomeName(home_name);

//When settings get changed
messaging.peerSocket.onmessage = function(evt) {
  if(evt.data.key == "timezone"){
    timezone = evt.data.value.values[0].value;
    
    fs.writeFileSync("timezone.txt", timezone, "utf-8");
    vibration.start("confirmation");
  }else if(evt.data.key == "timezoneName"){
    setTimeZoneName(evt.data.value.name+"");
    
    fs.writeFileSync("timezoneName.txt", evt.data.value.name+"", "utf-8");
  }else if(evt.data.key == "home"){
    setHomeName(evt.data.value.name+"");
    
    fs.writeFileSync("home.txt", evt.data.value.name+"", "utf-8");
  }
}

function setTimeZoneName(name){
  other_timezone_label.text = name;
}

function setHomeName(name){
  main_label.text = name;
}