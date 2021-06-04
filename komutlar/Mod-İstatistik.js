const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;
exports.run = async (client, message, args) => {
  const seksizaman = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
    .setColor("Gold")
    .setTimestamp()
    .setFooter("StorikaNW", client.user.avatarURL())
    .addField("» **StorikaNW**","Bot İstatistikleri")
    .addField(
      "» **Bellek kullanımı**",
      (process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB",
      true
    )
    .addField("» **Çalışma süresi**", seksizaman, true)
    .addField(
      "» **Kullanıcılar**",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
  .setImage(
          "https://media.discordapp.net/attachments/839317679080472606/845665864266285116/standard_2.gif"
        )
    .addField("» **Discord.JS sürüm**", "v" + Discord.version, true)
    .addField("» **Node.JS sürüm**", `${process.version}`, true);
  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["stats"],
  permLevel: 3,
  usage: prefix + "istatistik"
};

exports.help = {
  name: "istatistik",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};
