const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
exports.run = function(client, message, args) {



    const çekiliş = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTitle("Çekiliş Zamanıı!", true)
    .addField("Çekilişi Yapan:", `<@${message.author.id}>`, true)
    .addField("Çekilişin Yapıldığı Kanal:", message.channel)
    .addField("Çekilişin Yapıldığı Zaman:", message.createdAt)
    .addField(`Çekilişi Kazanan:`, `<@${message.guild.members.cache.random().id}>`, true)
    .setColor("RANDOM")
    .setDescription('StorikanW| Tebrikler')
    return message.channel.send(çekiliş);
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çekilişyap"],
  permLevel: 2,
  usage: prefix + 'çekilişyap'
};

exports.help = {
  name: 'çekilişyap',
  description: 'Çekiliş yapar.',
};