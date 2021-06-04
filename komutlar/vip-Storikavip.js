const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const svip2 = new Discord.MessageEmbed()
    .setTitle("StorikaVIP Üyelik Hakkında Bilgi")
    .setTimestamp()
    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setImage("https://cdn.discordapp.com/attachments/848589637878284340/848590274498265108/unknown.png")
    .setFooter("StorikaNW Vip Bilgi Sistemi")
    .setColor("#00d0d0")
    .setTimestamp()
   .addField("Özel isim görünümü",["**•Sunucu doluyken girebilme**","**•Renk kodlarını kullanabilme**","**•200x200 ada boyutu**", "**•6 Sethome Hakkı**"])
   .addField("Satın aldığında kullanılabilir komutlar",["**•/hat**","**•/repair**","**•/repair all**", "**•/feed**","**•/heal**","**•/backpack ile 6 slotluk sanal chest**", "**•/ec ile sanal ender chest**"])
    .addField("Satın alındığında verilen hediyeler",["**•1 Iron Golem Spawner**","**•2 Adet Zombi Pigman Spawner**", "**•2 Adet İnek Spawner**", "**•2 Adet VIP kasa anahtarı**","**•2 Adet Destansı Kasa anahtarı**" ,"**•2 Adet Elitra**","**•Sınırsız FLY**","**•100K oyun içi para**"])
    .addField("Süre ve Fiyat Bilgisi",["**•Ücret 75TL**", "**•Süre 1 AY**"])
    message.channel.send(svip2) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  usage: prefix + 'storikavip'
};

exports.help = {
  name: 'storikavip',
  description: '',
};