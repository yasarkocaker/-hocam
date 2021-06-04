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
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("StorikaNW", client.user.avatarURL())
    .addField("» **Gecikme süreleri**","Mesaj Gecikmesi: {ping1} ms \nBot Gecikmesi: {ping2} ms"
    .replace("{ping1}", new Date().getTime() - message.createdTimestamp)
    .replace("{ping2}", client.ws.ping),true)
    .addField("» **Bellek kullanımı**",(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB",true)
    .addField("» **Çalışma süresi**", seksizaman, true)
    .addField("» **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
    .addField("» **Kanallar**", client.channels.cache.size.toLocaleString(), true)
    .addField("» **Discord.JS sürüm**", "v" + Discord.version, true)
    .addField("» **Node.JS sürüm**", `${process.version}`, true)
    .addField("» **Müzik Çalınan Sunucu Sayısı**", client.voice.connections.size, true)
    .addField("» **CPU**",`\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,true)
    .addField("» **İşletim Sistemi**", `\`\`${os.platform()}\`\``, true)
  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  usage: prefix + 'gstats'
};

exports.help = {
  name: "gstats",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};
