const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  let embed = new Discord.MessageEmbed()
  .setDescription(mesaj)
  .setTitle("StorikaNW")
  .setColor("RANDOM")
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  usage: prefix + 'yaz'
};

exports.help = {
  name: 'yaz',
  description: 'İstediğiniz şeyi bota yazdırır.',
};