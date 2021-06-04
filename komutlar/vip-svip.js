const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const svip = new Discord.MessageEmbed()
    .setTitle("SVIP Üyelik Hakkında Bilgi")
    .setTimestamp()
    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
    .setImagesetImage("https://cdn.discordapp.com/attachments/848589637878284340/848590106147422208/unknown.png")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setFooter("StorikaNW Vip Bilgi Sistemi")
    .setColor("#04fb04")
    .setTimestamp()
   .addField("•Özel isim görünümü",["**•Sunucu doluyken girebilme**","**•Renk kodlarını kullanabilme**","**•140x140 ada boyutu**", "**•4 Sethome Hakkı**"])
   .addField("Satın aldığında kullanılabilir komutlar",["**•/hat**","**•/repair**","**•/repair all**", "**•/feed**","**•/heal**","**•/backpack ile 2 slotluk sanal chest **", "**•/ec ile sanal ender chest**"])
    .addField("Satın alındığında verilen hediyeler",["**•1 Adet Zombi Spawner**","**•1 Adet İnek Spawner**", "**•1 Adet VİP kasa anahtarı**","**•1 Adet Destansı Kasa anahtarı**" ,"**•Günlük 2 saat FLY**","**•50K oyun içi para**"])
    .addField("Süre ve Fiyat Bilgisi",["**•Ücret 30TL**", "**•Süre 1 AY**"])
    message.channel.send(svip) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  usage: prefix + 'svip'
};

exports.help = {
  name: 'svip',
  description: '',
};