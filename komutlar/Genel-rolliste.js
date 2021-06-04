const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
if(!message.member.hasPermission('MANAGE_ROLES')) return;
let chimped = message.guild.roles.cache.filter(a => a.name !== 'everyone' && !a.managed).sort((a, b) => a.position - b.position).map(c => c.name).reverse()
message.channel.send('```'+`Roles [${message.guild.roles.cache.size}]:\n`+chimped.join('\n')+'```')
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rolliste"],
  permLevel: 0,
  usage:prefix + "rolliste"
}

exports.help = {
  name: 'roles'
};