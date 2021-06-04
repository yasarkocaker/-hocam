const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

 exports.run = (client, message, args) => {
   message.delete();

   let question = args.join(' ');

   let user = message.author.username

   if (!question) return message.channel.send(

     new Discord.MessageEmbed()

     .addField(`StorikaNW Oy Sistemi`,` :x: Lütfen Oylanacak konuyu giriniz :x: `)).then(m => m.delete(5000));

     console.log("oylama komutu " + message.author.username + '#' + message.author.discriminator + " tarafından kullanıldı.")
     message.channel.send(

       new Discord.MessageEmbed()

       .setColor("03f2df")
       .setThumbnail(client.user.avatarURL())
       .setTimestamp()
       .setFooter('Bot İşi Gönül İşidir ❤️ ', client.user.avatarURL())
       .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
       .addField(`StorikaNW Oylama Sistemi`, `**${question}**`)).then(function(message){

       message.react('✅');

         message.react('❌');

        });

    };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['oylama'],
       usage: prefix + 'oylama',
       permLevel: 2
};

exports.help = {
  name: 'oylama',
  description: 'Oylama yapmanızı sağlar.'
};