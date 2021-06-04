const Discord = require('discord.js');
const database = require('quick.db');
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {

let argslar = ['add', 'remove', 'set', 'clear'];
if(!args[0] || !argslar.includes(args[0])) {

let prefixes = ['1. <@!'+client.user.id+'>'];
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && prefixler.length >= 1) {
var i = 1;
for(const key in prefixler) {
i++
prefixes.push(i+'. '+prefixler[key]);
};
};

const embed = new Discord.MessageEmbed()
.setTitle('Prefixler')
.setColor('BLUE')
.setFooter(`${prefixes.length} prefixes`)
.setDescription(prefixes.join('\n'));
return message.channel.send(embed);

};

if(args[0] === 'add') {
if(!args[1]) return;
if(args[1].startsWith('"') && args[args.length-1].endsWith('"')) {
let arg = args.slice(1).join(' ').slice(1, args.slice(1).join(' ').length-1);
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && prefixler.some(a => a === arg)) return message.channel.send(`${arg} added`);  
await database.push(`prefixes.${message.guild.id}`, arg);
return message.channel.send(`${arg} added`);
};
if(args[2]) return message.channel.send("Çok fazla ekledin birkaç tanesini kaldır");
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && prefixler.some(a => a === args[1])) return message.channel.send(`${args[1]} added`);  
await database.push(`prefixes.${message.guild.id}`, args[1]);
return message.channel.send(`${args[1]} added`);
};

if(args[0] === 'remove') {
if(!args[1]) return;
if(args[1].startsWith('"') && args[args.length-1].endsWith('"')) {
let arg = args.slice(1).join(' ').slice(1, args.slice(1).join(' ').length-1);
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && !prefixler.some(a => a === arg)) return message.channel.send('Bunu Ekleyemedim.');  
await database.set(`prefixes.${message.guild.id}`, prefixler.filter(a => a !== arg));
return message.channel.send(`${arg} removed`);
};
if(args[2]) return message.channel.send("Çok fazla ekledin birkaç tanesini kaldır");
const prefixler = await database.fetch(`prefixes.${message.guild.id}`);
if(prefixler && !prefixler.some(a => a === args[1])) return message.channel.send('Bunu Ekleyemedim');  
await database.set(`prefixes.${message.guild.id}`, prefixler.filter(a => a !== args[1]));
return message.channel.send(`${args[1]} removed`);
};

if(args[0] === 'set') {
if(!args[1]) return;
if(args[1].startsWith('"') && args[args.length-1].endsWith('"')) {
let arg = args.slice(1).join(' ').slice(1, args.slice(1).join(' ').length-1);
await database.delete(`prefixes.${message.guild.id}`);
await database.push(`prefixes.${message.guild.id}`, arg);
return message.channel.send(`Prefix for this server is now ${arg}.`);
};
if(args[2]) return message.channel.send("Çok fazla prefix ekledin lütfen birkaç tanesini kaldır.");
await database.delete(`prefixes.${message.guild.id}`);
await database.push(`prefixes.${message.guild.id}`, args[1]);
return message.channel.send(`Prefix for this server is now ${args[1]}.`);
};

if(args[0] === 'clear') {
await database.delete(`prefixes.${message.guild.id}`);
return message.channel.send('Tüm Prefixler kaldırıldı yeni bir kaç tanesini ekle.');
};

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  usage: prefix + 'prefix'
};

exports.help = {
  name: 'prefix'
};