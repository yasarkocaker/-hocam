const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
let prefix = ayarlar.prefix;
 
exports.run = (client, msg, args) => {//Resađ Seferov?#0809
  let x;
  let x2;
  let x3;
  let x4;
  let x5;
  let x6;
  let x7;
  let x8;
  let x9;
  let x10;
  let x11;
  let x12;
  let x13;
  let x14;
  let x15;
  let izinci = msg.mentions.users.first() || msg.member;
  let yetki_var = "✓";//özel emoji de koya bilirsiniz
  let yetki_yok = "×";
  //yönetici
  if (msg.guild.member(izinci).hasPermission("ADMINISTRATOR"))
    x = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("ADMINISTRATOR"))
    x = yetki_yok;
 
  //Denetim kaydı
  if (msg.guild.member(izinci).hasPermission("VIEW_AUDIT_LOG"))
    x2 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("VIEW_AUDIT_LOG"))
    x2 = yetki_yok;
 
  //Sunucuyu yönet
  if (msg.guild.member(izinci).hasPermission("MANAGE_GUILD"))
    x3 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MANAGE_GUILD"))
    x3 = yetki_yok;
 
  //Rolleri yönet
  if (msg.guild.member(izinci).hasPermission("MANAGE_ROLES"))
    x4 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MANAGE_ROLES"))
    x4 = yetki_yok;
 
  //Kanalları yönet
  if (msg.guild.member(izinci).hasPermission("MANAGE_CHANNELS"))
    x5 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MANAGE_CHANNELS"))
    x5 = yetki_yok;
 
  //üyeleri at
  if (msg.guild.member(izinci).hasPermission("KICK_MEMBERS"))
    x6 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("KICK_MEMBERS"))
    x6 = yetki_yok;
 
  //üyeleri yasakla
  if (msg.guild.member(izinci).hasPermission("BAN_MEMBERS"))
    x7 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("BAN_MEMBERS"))
    x7 = yetki_yok;
 
  //mesajları yönet
  if (msg.guild.member(izinci).hasPermission("MANAGE_MESSAGES"))
    x8 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MANAGE_MESSAGES"))
    x8 = yetki_yok;
 
  //kullanıcı adlarını yönet
  if (msg.guild.member(izinci).hasPermission("MANAGE_NICKNAMES"))
    x9 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MANAGE_NICKNAMES"))
    x9 = yetki_yok;
 
  //emojileri yönet
  if (msg.guild.member(izinci).hasPermission("MANAGE_EMOJIS"))
    x10 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MANAGE_EMOJIS"))
    x10 = yetki_yok;
 
  //webhookları yönet
  if (msg.guild.member(izinci).hasPermission("MANAGE_WEBHOOKS"))
    x11 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MANAGE_WEBHOOKS"))
    x11 = yetki_yok;
 
  if (msg.guild.member(izinci).hasPermission("MENTION_EVERYONE"))
    x12 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MENTION_EVERYONE"))
    x12 = yetki_yok;
 
  //CHANGE_NICKNAME
  if (msg.guild.member(izinci).hasPermission("PRIORITY_SPEAKER"))
    x13 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("PRIORITY_SPEAKER"))
    x13 = yetki_yok;
 
  //MOVE_MEMBERS
  if (msg.guild.member(izinci).hasPermission("CHANGE_NICKNAME"))
    x14 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("CHANGE_NICKNAME"))
    x14 = yetki_yok;
 
  if (msg.guild.member(izinci).hasPermission("MOVE_MEMBERS"))
    x15 = yetki_var;
  if (!msg.guild.member(izinci).hasPermission("MOVE_MEMBERS"))
    x15 = yetki_yok;
 
  const embed = new Discord.MessageEmbed()
    .setColor("Red")
    .setAuthor
   (
      msg.mentions.users.first()
      ? msg.mentions.users.first().tag
      : izinci.user.tag
      ,
      msg.mentions.users.first()
      ? msg.mentions.users.first().displayAvatarURL()
      : izinci.user.displayAvatarURL()
    )
    .setDescription(
      `
${x} Yönetici
${x2} Denetim Kaydını Görüntüle
${x3} Sunucuyu Yönet
${x4} Rolleri Yönet
${x5} Kanalları Yönet
${x6} Üyeleri At
${x7} Üyeleri Yasakla
${x8} Mesajları Yönet
${x9} Kullanıcı Adlarını Yönet
${x10} Emojileri Yönet
${x11} Webhook'ları Yönet
${x12} @everyone ve @here kullan,tüm rollerden bahset
${x13} Öncelikli konuşmacı
${x14} Kendi ismini değiştire bilme
${x15} Üyeleri çek
`
   )
   .setTimestamp()
   .setFooter("StorikaNW", client.user.avatarURL());
 msg.channel.send(embed);
};
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["izinler"],
 permLevel: 3,
 kategori: "kullanıcı",
 usage: prefix + 'yetkiler'
};
 
exports.help = {
 name: "yetkiler",
 description: "Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.",
};
