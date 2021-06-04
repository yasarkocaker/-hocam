const Discord = require('discord.js');
const moment = require('moment');
moment.locale('tr');
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = (client, message, args) => {// can ♡ b#1010

let mention = message.author;
if(message.mentions.members.first()) mention = message.mentions.members.first().user;
let mentionMember = message.guild.members.cache.get(mention.id);

let slm = {
  web: 'İnternet Tarayıcısı',
  desktop: 'Bilgisayar',
  mobile: 'Mobil'
}
let oyunlar = [];
mention.presence.activities.forEach(slm => {
if(slm.type === 'CUSTOM_STATUS') {
oyunlar.push(`${slm.emoji ? slm.emoji : ''} ${slm.state}`);
} else {
oyunlar.push(`**${slm.name}** ${slm.type.replace('PLAYING', 'oynuyor').replace('STREAMING', 'yayınlıyor').replace('LISTENING', 'dinliyor').replace('WATCHING', 'izliyor')}`)
}});

let sa;
if(mention.bot) {
sa = 'Bilinmiyor.'
} else {
sa = slm[Object.keys(mention.presence.clientStatus)[0]];
};
const embed = new Discord.MessageEmbed()
.setColor('Gold')
.setAuthor(mention.tag, mention.avatarURL({dynamic: true}))
.setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
.addField('Durum', mention.presence.status.replace('online', 'Çevrimiçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin').replace('offline', 'Çevrimdışı'), true)
.addField('İstemci Durumu', sa, true)
.addField('Ad', mention.username+` (${mention})`, true)
.addField('Katılma Tarihi', moment(mentionMember.joinedAt).format('D MMMM YYYY'), true)
.addField('Kayıt Tarihi', moment(mention.createdAt).format('D MMMM YYYY'), true)
.addField('Aktivite', oyunlar.join('\n') ? oyunlar.join('\n') : 'Hiç yok.')
.addField('Roller', mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Hiç yok.')
.setFooter("StorikaNW | Kullanıcı Bilgi Sistemi ")
.setTimestamp();

message.channel.send(embed);
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['profil'],
  permLevel: 2,
  usage: prefix + 'profil'
};
 
exports.help = {
  name: 'ui'
};