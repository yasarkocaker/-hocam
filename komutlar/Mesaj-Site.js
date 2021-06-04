const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
const { MessageButton } = require('discord-buttons');
const { MessageEmbed} = require ('discord.js');
exports.run = (client, message, args) => {
  const disbut = require('discord-buttons')
  var embed = new MessageEmbed()
  .setTitle("Sunucumuzun Sitesine gitmek istiyorsan tıkla.")
  .setColor("Gold")

  var buton1 = new MessageButton()
  .setStyle("url")
  .setURL("https://storikanw.net/")
  .setLabel("Tıkla")
.setID("subs-yes");


return message.channel.send({
  button: buton1,
  embed: embed
})


  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  usage: prefix + 'site'
};

exports.help = {
  name: 'site',
  description: 'api'
};