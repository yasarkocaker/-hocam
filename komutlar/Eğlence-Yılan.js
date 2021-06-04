const Discord = require('discord.js')
const GameCord = require('gamecord-fork').djs
const db = require('quick.db')
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

 exports.run = async (client, message, args) => {
   if(message.author.bot) return;
  if(message.channel.id !== '845377960436301854') return;
    let kontrol = await db.fetch(`dil_${message.guild.id}`);
  if (kontrol == "tr") {
    new GameCord.SnakeGame(message)
        .setTitle('Yılan Oyunu')
        .setColor('#7298da')
        .setTime(60000) // Always better to set max time because the default one is just 5s
                .run()

} else {
    new GameCord.SnakeGame(message)
    .setTitle('Yılan Oyunu')
    .setColor('#7298da')
    .setTime(60000) // Always better to set max time because the default one is just 5s
    .run()  
}
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['snake', 'yılan', 'yılanoyunu', 'play-snake', 'yılan-oyna','yılan-oyunu'],
    permLevel: 0,
    usage: prefix + "snake"
  };
   
  exports.help = {
    name: "snake",
    description: "yılan oyunu oynatır",
  };