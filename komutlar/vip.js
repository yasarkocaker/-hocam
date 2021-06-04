const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const vip = new Discord.MessageEmbed()
    .setTitle("VIP Üyelik Hakkında Bilgi")
    .setTimestamp()
    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
    .setImage("https://cdn.discordapp.com/attachments/848589637878284340/848590052203954206/unknown.png")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setFooter("StorikaNW Vip Bilgi Sistemi")
    .setColor("#f56420")
    .setTimestamp()
   .addField("•Özel isim görünümü",["**•Sunucu doluyken girebilme**","**•120x120 ada boyutu**", "**•3 Sethome Hakkı**"])
   .addField("Satın aldığında kullanılabilir komutlar",["**•/hat**","**•/repair**", "**•/feed**","**•/backpack ile 1 slotluk sanal chest**", "**•/ec ile sanal ender chest**"])
    .addField("Satın alındığında verilen hediyeler",["**•1 Adet Zombi Spawner**", "**•1 Adet VİP kasa anahtarı**", "**•Günlük 1 saat FLY**","**•25K oyun içi para**"])
    .addField("Süre ve Fiyat Bilgisi",["**•Ücret 15TL**", "**•Süre 1 AY**"])
    message.channel.send(vip) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  usage: prefix + 'vip'
};

exports.help = {
  name: 'vip',
  description: '',
};