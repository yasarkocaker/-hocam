const Discord = require("discord.js");
const fetch = require("node-fetch");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {

    const API = await fetch(`http://mcapi.tc/?mc.storikanw.net/json`)
    const Data = await API.json();
         const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Storikanw")
            .addField(`Sunucu IP Adresi`, "mc.storikanw.net")
            .addField(`Ping`, Data.ping, true)
            .addField(`Oyuncu Sayısı`, `${Data.players}/${Data.max_players}`, true)
            .addField(`Versiyon`, Data.version, true)
            .setImage(`http://status.mclive.eu/StorikaNW/mc.storikanw.net/25565/banner.png`)
            .setFooter("StorikaNW tarafından yapıldı.");
        message.channel.send(embed)
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["storika"],
    permLevel: 0,
    usage: prefix + 'storika'
};
exports.help = {
    name: 'server',
};