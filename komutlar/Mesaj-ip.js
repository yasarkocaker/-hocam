const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
exports.run = function(client, message, args) {



    const ip = new Discord.MessageEmbed()
    .setDescription(["\<a:mc:842452205592117309> **mc.storikanw.net**  \<a:mc:842452205592117309>","\<a:mc:842452205592117309> **oyna.storikanw.net** \<a:mc:842452205592117309>","\<a:mc:842452205592117309> **play.storikanw.net** \<a:mc:842452205592117309>"])
    .setColor("#00d0d0")
    return message.channel.send(ip);
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  usage: prefix + 'usage ip'
};

exports.help = {
  name: 'ip',
  description: 'Çekiliş yapar.',
};