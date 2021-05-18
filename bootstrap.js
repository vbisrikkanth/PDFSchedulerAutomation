const event = require('codeceptjs').event;
const fs=require('fs')
module.exports = function() {

  event.dispatcher.on(event.suite.before, function (suite) {
    fs.existsSync('./output/sara');
    console.log("JOKER IS HERE");

  });
}