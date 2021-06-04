const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {

console.log("Bot başarı ile giriş yaptı.")

client.user.setStatus("online");
var oynuyor = [
 "🔥 mc.storikanw.net",
 "🔥 oyna.storikanw.net",
 "🔥 play.storikanw.net"
];

setInterval(function() {
    var random = Math.floor(Math.random()  *  (oynuyor.length - 0 + 1 ) + 0);

    client.user.setActivity(oynuyor[random], "");
}, 2 * 2500);
}