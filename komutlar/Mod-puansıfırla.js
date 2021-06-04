const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {

  
    message.channel.send('Puanlar sıfırlanıyor...').then(async msg => {
  let all = db.all().filter(i => i.ID.startsWith('puan_'))
  for (const i of all) db.delete(i.ID)
  msg.edit('Puanlar sıfırlandı.')
      })
  }

exports.conf = { 
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 3,
  usage: prefix + 'puansıfırla'
};

exports.help = { 
  name: 'puansıfırla', 
  description: 'DB temizleme', 
};