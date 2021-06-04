const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
    const laura = (abcdef) => {
        message.channel.send(new Discord.MessageEmbed().setTitle('Bir hata oluştu!').setDescription(abcdef).setColor('RED'));
    };

    const lauraa = args[0];
    if (!lauraa) return laura('Bir komut ismi giriniz.');

    const command = client.commands.get(lauraa) || client.commands.get(client.aliases.get(lauraa));
    if (!command) return laura('Böyle bir komut bulunamadı.');

    const usage = command.conf.usage;
    message.channel.send(new Discord.MessageEmbed().setTitle(`${lauraa} komutunun kullanım şekli`).setDescription(`\`${usage}\``));
};

// * Command Config
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yardım'],
  usage: '!usage [komut ismi]',
  permLevel: 0
};

exports.help = {
  name: "usage"
};