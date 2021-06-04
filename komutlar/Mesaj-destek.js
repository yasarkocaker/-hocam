const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
const { MessageEmbed} = require ('discord.js');
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  const disbut = require('discord-buttons')
  var embed = new MessageEmbed()
  .setTitle("Sitemizin Destek bölümüne gitmek için tıkla")
  .setColor("Gold")

  var buton1 = new MessageButton()
  .setStyle("url")
  .setURL("https://storikanw.net/destek")
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
  usage: prefix + 'destek'
};

exports.help = {
  name: 'destek',
  description: 'api',
};

