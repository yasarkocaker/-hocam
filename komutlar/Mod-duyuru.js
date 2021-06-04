const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;
exports.run = async (client, message, args) => {
  let mesaj = args.slice(0).join(" ");
   if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "**Bunu sadece YÖNETİCİ yetkisi olan kişiler yapabilir.**"
    );


    let duyurukanal = "842444806621102103";
  let duyuru = await message.guild.channels.cache.get(duyurukanal);

  message.delete();

  const sj = new Discord.MessageEmbed()
    .setTitle("StorikaNW Duyuru")
    .setDescription(`${mesaj}`)
  .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
    .setFooter("İyi Oyunlar !");
  duyuru.send(sj);
};

module.exports.conf = {
  aliases: [],
  permLevel: 3,
  usage: prefix + 'duyuru',
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "duyuru",
  description: "duyuru",
};
