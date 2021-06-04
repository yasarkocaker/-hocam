const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
let sa = await db.fetch(`sillog_${message.guild.id}`)
      let silmek = args[0]
  if (!silmek) return message.reply('❌ Bir Sayı Gırmelısın!')
  if (isNaN(silmek)) return message.reply('Rakam Gırmelısın !')
  if (silmek < 0) return message.reply('0 dan Küçük Değer Belirtemezssin')
  if(silmek > 100) return message.reply('100 den büyük bir değer belirtemezssin')
  
  
  message.channel.bulkDelete(silmek).then(() =>  {
    let embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
    .setDescription(`
Silen Kişi : ${message.author.tag}
Kanal : ${message.channel}
Silinen Miktar : **${silmek}**
`)
    
 message.channel.send(embed).then(message => message.delete({timeout:5000})); 

  })
  
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clear","temizle"],
  permLevel: 2,
  usage: prefix + 'sil'
};

exports.help = {
  name: 'sil'
};