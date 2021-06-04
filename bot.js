const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const disbut = require ('discord-buttons')(client)
const moment = require("moment");
var rpc = require("discord-rpc");
const shorten = require("isgd");
const Jimp = require("jimp");
const fetch = require("node-fetch");
const db = require("quick.db");
const ms = require("ms");
var prefix = ayarlar.prefix;
var renk = ayarlar.renk;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
/////////////////////////////////////////////////////////////////////// KOMUTLAR BAŞLANGIÇ
  // codare ♥
  const allDatas = [
    { roleID: '845379223861461002' },// buraya verilecek/alınacak rol idlerini yazın tek tek
  ]
  client.on('message', async message => {
    if(message.content.startsWith(prefix+'buttonrole') || message.content.startsWith(prefix+'br')) {
      var args = message.content.split(/ +/g).slice(1);

      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanmak için yeterli yetkin yok.');
      if(!args[0]) return message.channel.send('Bir argüman belirtmen gerekiyor. Kullanabileceklerin: ekle, sil');
    
      if(args[0] === 'kur') {
    
        var channel;
        if(!message.mentions.channels.first()) {
          const newArgs = args.reverse();
          newArgs.push('');
          args = newArgs.reverse();
          channel = message.channel;
        } else {
          channel = message.mentions.channels.first();
        };
        if(!channel) return message.channel.send('Etiketlediğin kanalı bulamıyorum.');
    
        if(!args[2]) return message.channel.send('Bir mesaj ID\'si belirtmelisin.');
        var messageFetch = await channel.messages.fetch(args[2]).catch(error => {
          return message.channel.send('Yanlış bir mesaj ID\'si belirttin yada bu mesajı etiketlediğin kanalda bulamıyorum.');
        });
        if(messageFetch.id !== args[2]) return;
    
        messageFetch.delete();
        if(!messageFetch.content) return; 

        db.delete(`emoji-rol.${message.guild.id}`);
        const buttons = [];
        allDatas.forEach(data => {
         db.push(`emoji-rol.${message.guild.id}`, {
            name: message.guild.roles.cache.get(data.roleID).name
          });
          buttons.push(new disbut.MessageButton()
          .setStyle('blurple')
          .setLabel(message.guild.roles.cache.get(data.roleID).name)
          .setID(message.guild.roles.cache.get(data.roleID).name));
        });

        return channel.send(messageFetch.content, { buttons: buttons });
      };

    };
  });

  client.on('clickButton', async (button) => {
    const data = await db.fetch(`emoji-rol.${button.guild.id}`);
    if(data && data.length > 0 && data.some(c => c.name == button.id)) {
      button.defer(true)

      const finded = data.find(c => c.name == button.id);
      if(button.clicker.member.roles.cache.has(button.guild.roles.cache.find(x => x.name == finded.name).id)) {
        return button.clicker.member.roles.remove(button.guild.roles.cache.find(x => x.name == finded.name).id);
      } else {
        return button.clicker.member.roles.add(button.guild.roles.cache.find(x => x.name == finded.name).id);
      };
    };
     });
//////////////////////////////////////////////////////////////////////////
client.on('ready', () => {
  client.guilds.cache.forEach(guild => {
  guild.members.cache.forEach(async member => {
  const fetch = await db.fetch(member.user.id);
  if(!fetch) return;
  if((Date.now() <= fetch.end) || fetch) {
  let kalan = fetch.end - Date.now();
  let logChannelID = '839306378736828456'; // sizin log kanalızın idsi
  let logChannel = await guild.channels.cache.get(logChannelID);
  setTimeout(() => {
  const embed = new Discord.MessageEmbed()
  .setAuthor(fetch.moderatorUsername, fetch.moderatorAvatarURL);
  return member.roles.remove('845878226361516034').then(() => db.delete(member.user.id) && logChannel.send(embed.setColor('GREEN').setTitle('Susturulması açıldı.').setDescription(`**• Moderatör**: <@!${fetch.moderatorID}>
  **• Susturulan**: <@!${member.user.id}>
  **• Sebep**: ${fetch.reason}`)));
  }, kalan);
  };
  });
  });
  });
////////////////////////////////////////////////////////////////////// Buton Sistemi
client.on('clickButton', async (button) => {
  if (button.id === 'lite') {
       button.edit('Ğ');
    button.defer(false);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////// Taşşaklı Öneri Sistemi

client.on("message", async m =>{
  let ganal = "848048252569518090"
  if(m.channel.id !== ganal) return; 
  if(m.author.bot) return
  await m.delete()
    let onay =new disbut.MessageButton()
      .setStyle("blurple")
      .setLabel("Onayla")
      .setID("oneri-onay");
      let red = new disbut.MessageButton()
      .setStyle("red")
      .setLabel("Reddet")
      .setID("oneri-red");
      let embed = new Discord.MessageEmbed()
      .setAuthor("Öneri")
      .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
      .setDescription(`${m.content}`)
      .setFooter(m.author.tag, m.author.avatarURL({dynamic:true}))
      .setColor("Red")
      client.channels.cache.get(ganal).send({embed,buttons:[onay,red]}).then(gidenonay =>
        {
          gidenonay.react("\<a:oq:842449196110970891>")
          gidenonay.react("\<a:no:842449246242603059>")
        })
    
  }
)



client.on('clickButton', async (button) => {

  if(!button.clicker.member._roles.includes("839304922142212116")) return;  
  let onay = new disbut.MessageButton()
  .setStyle('blurple')
  .setDisabled()
  .setID("oneri-onay");
  let red = new disbut.MessageButton()
  .setStyle("red")
  .setDisabled()
  .setID("oneri-red");
  if(button.id === "oneri-onay") {
    button.message.embeds[0].color = "GREEN"
    button.message.embeds[0].author.name = "✔️ ONAYLANDI"
    red.setLabel("✔️ onaylandı")
    onay.setLabel("✔️ onaylandı")
    button.message.edit({embed:button.message.embeds[0],buttons:[onay,red]})
  }
  if(button.id === "oneri-red"){
    button.message.embeds[0].author.name = "❌ REDDEDİLDİ"
    red.setLabel("❌ Reddedildi")
    onay.setLabel("❌ Rededildi")
    button.message.edit({embed:button.message.embeds[0], buttons:[onay,red]})

  }
  button.defer(true)
})
////////////////////////////////////////////////////////////////////////////////////////// KELİME OYUNU
client.on('message', async(message) => {
  
  if(message.author.bot) return;
    if(message.channel.id !== '845376739382132786') return;
  if(message.content.startsWith('.')) return;
  if(message.content.split(" ").length > 1) return message.channel.send('Dostum kelime kullanıcaksın!').then(msg => {
                  msg.delete({ timeout: 5000})
                  message.delete()
              })
  let kelime = db.get(`son_${message.guild.id}`)
  let kelimeler = db.get(`kelimeler_${message.guild.id}`)
  
  let kişi = db.get(`klm_${message.guild.id}`)
  if(kişi == message.author.id) return message.channel.send('en son zaten sen yazmışsın -_-').then(msg => {
                  msg.delete({ timeout: 5000})
                  message.delete()
              })
  
    
    
  const alphabet = "abcdefghiklmnopqrstuvyz"
  
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
    
    
    
  if(kelime == null) {
  let son = randomCharacter.charAt(randomCharacter.length-1)
  db.set(`son_${message.guild.id}`, son)
  message.channel.send('Oyun **' + son + '** harfi ile başladı')
  } 
    
    
    
  if(kelime.toLowerCase() == 'ğ') return message.channel.send('oyun **'+ kelime + '** harfi ile bittiği için farklı bir harf yönlendirilecek...').then(msg => {
                  msg.delete({ timeout: 5000})
                  message.delete()
  db.subtract(`kelime_${message.guild.id}`, 1)
  let son = randomCharacter.charAt(randomCharacter.length-1)
  db.set(`son_${message.guild.id}`, son)
  message.channel.send('Oyun **' + son + '** harfi ile devam ediyor.')
                  msg.delete({ timeout: 5000})
                  message.delete()
              })
    
  if(kelime.toLowerCase() !== message.content.charAt(0)) return message.channel.send('en son yazılan kelime **'+ kelime + '** ile bitmiş üzgünüm :(').then(msg => {
                  msg.delete({ timeout: 5000})
                  message.delete()
              })
  if(!kelimeler) return db.push(`kelimeler_${message.guild.id}`, message.content)
  if(kelimeler.includes(message.content)) return message.channel.send('Bu kelime zaten yazılmış başka bir şey dene :/').then(msg => {
                  msg.delete({ timeout: 5000})
                  message.delete()
      })
  
  
  
  
  const api = await fetch(`https://sozluk.gov.tr/gts?ara=${encodeURI(message.content)}` )
        .then(response => response.json());
  if(api.error) return message.channel.send('Öyle bir kelime yok dostum !').then(msg => {
                  msg.delete({ timeout: 5000})
                  message.delete()
  db.subtract(`puan_${message.guild.id}_${message.author.id}`, 1)
              })
  
  db.push(`kelimeler_${message.guild.id}`, message.content)
  db.set(`son_${message.guild.id}`, message.content.charAt(message.content.length-1))
  db.set(`klm_${message.guild.id}`, message.author.id)
  db.add(`puan_${message.guild.id}_${message.author.id}`, 2)
  message.react('\<a:true:842449363455836221>')
  })
  
//////////////////////////////////////////////////////////////////////// OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "site") {
    let aboo = new Discord.MessageEmbed()
    .setTitle("Sunucumuzun Sitesine gitmek istiyorsan tıkla.")
    .setColor(renk)

    var budon = new disbut.MessageButton()
    .setStyle("url")
    .setURL("https://storikanw.net/")
    .setLabel("Tıkla")
  .setID("subs-yes");

    msg.reply({
      button: budon,
      embed: aboo
    });
  }
});
/////////////////////////////////////////////////////////////////////////  OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("Aleyküm Selam Hoşgeldin");
  }
});
///////////////////////////////////////////////////////////////////////// OTO CEVAP
client.on("message", async (msg) => {
  if (msg.content.toLowerCase() === "ip ne") {
    let ipne = new Discord.MessageEmbed()
    .setDescription([
      "**mc.storikanw.net**",
      "**play.storikanw.net**",
      "**oyna.storikanw.net**"
    ])
    .setColor(renk)
    msg.channel.send(ipne);
  }
});
////////////////////////////////////////////////////////////////////////////// OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "ip") {
    let ip = new Discord.MessageEmbed()
    .setDescription([
      "**mc.storikanw.net**",
      "**play.storikanw.net**",
      "**oyna.storikanw.net**"
    ])
    .setColor(renk)
    msg.channel.send(ip)
  }
});
//////////////////////////////////////////////////////////////////////////////////////////  OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sürüm") {
    msg.reply(
      "**Sunucumuzun ana sürümü 1.16.5'tir ama 1.12.2 ve üstüyle de girebilirsiniz!**"
    );
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////// OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sürüm ne") {
    msg.reply(
      "**Sunucumuzun ana sürümü 1.16.5'tir ama 1.12.2 ve üstüyle de girebilirsiniz!**"
    );
  }
});

////////////////////////////////////////////////////////////////////////////////////////// OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sürüm kaç") {
    msg.reply(
      "**Sunucumuzun ana sürümü 1.16.5'tir ama 1.12.2 ve üstüyle de girebilirsiniz!**"
    );
  }
});

//////////////////////////////////////////////////////////////////////////////////////////  OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "event ne zaman") {
    msg.reply("Her akşam saat 20.30 da");
  }
});

////////////////////////////////////////////////////////////////////////////////////////// OTO CEVAP
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "/help") {
    msg.reply("Lütfen yardım komutları için st!help yazınız");
  }
});
///////////////////////////////////////////////////////////////////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "31") {
    msg.delete()
  let sıjı = new Discord.MessageEmbed()
  .setDescription([`<@${msg.author.id}> Toxiclik yapma`])
  .setColor(renk)
  msg.channel.send(sıjı).then(msg =>
    msg.delete({timeout: 5000 })
  )}
});
///////////////////////////////////////////////////////////////////////
////////////////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "3 1") {
    msg.delete()
  let sıjı = new Discord.MessageEmbed()
  .setDescription([`<@${msg.author.id}> Toxiclik yapma`])
  .setColor(renk)
  msg.channel.send(sıjı).then(msg =>
    msg.delete({timeout: 5000 })
  )}
});
//////////////////////////////////////////////////////////////////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "3 ve 1") {
    msg.delete()
  let sıjı = new Discord.MessageEmbed()
  .setDescription([`<@${msg.author.id}> Toxiclik yapma`])
  .setColor(renk)
  msg.channel.send(sıjı).then(msg =>
    msg.delete({timeout: 5000 })
  )}
});
//////////////////////////////////////////////////////////////////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "na pim") {
    msg.delete()
  let sıjı = new Discord.MessageEmbed()
  .setDescription([`<@${msg.author.id}> Toxiclik yapma`])
  .setColor(renk)
  msg.channel.send(sıjı).then(msg =>
    msg.delete({timeout: 5000 })
  )}
});
//////////////////////////////////////////////////////////////////////
client.on("message", async msg => {
  if (msg.content.toLowerCase() === "napim") {
    msg.delete()
  let sıjı = new Discord.MessageEmbed()
  .setDescription([`<@${msg.author.id}> Toxiclik yapma`])
  .setColor(renk)
  msg.channel.send(sıjı).then(msg =>
    msg.delete({timeout: 5000 })
  )}
});
////////////////////////////////////////////////////////////////////////  CAPS ENGEL SİSTEMİ
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

client.on("message", async message => {
  if (!message.guild) return;
  let acikmi = await db.fetch(`${message.guild.id}.capsengel`);
  if (!acikmi) return;
  if (message.author.bot) return;
  if (message.member.hasPermission("MANAGE_MESSAGES")) return;
  let matched = message.content.replace(/[^A-Z]/g, "").length;
  let yuzde = percentage(matched, message.content.length);
  if (Math.round(yuzde) > acikmi.yuzde) {
    message.delete();
    message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setFooter(
            "StorikaNW Capslock Engel Sistemi",
            message.guild.iconURL({ dynamic: true })
          )
          .setAuthor(
            "CapsLock Engelleme Sistemi",
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            message.author.username +
              " - " +
              (message.member.nickname
                ? `${message.member.nickname} - ${message.author.id}`
                : message.author.id) +
              "\n**Uyarı!  Bu sunucuda büyük harfle yazma engeli bulunmaktadır!**\nBu sebepten göndermiş olduğunuz mesaj silindi."
          )
      )
      .then(msg => msg.delete({ timeout: 3000 }));
  } else {
    return;
  }
});

////////////////////////////////////////////////////////////////////////////////////////// REKLAM ENGEL
const reklam = [
  ".com",
  ".net",
  ".xyz",
  ".tk",
  ".pw",
  ".io",
  ".me",
  ".gg",
  "www.",
  "https",
  "http",
  ".gl",
  ".org",
  ".com.tr",
  ".biz",
  ".net",
  ".rf.gd",
  ".az",
  ".party",
  "discord.gg"
];

client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
    if (i) {
      if (reklam.some(word => nev.content.includes(word))) {
        if (nev.member.hasPermission("BAN_MEMBERS")) return;
        //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
        const embed = new Discord.MessageEmbed()
          .setColor("#ff7e00")
          .setDescription(
            `${nev.author} , **Ben varken reklam yapmaya mı çalıştın ?**`
          )
          .addField("reklam:", nev);

        nev.delete();
        const embeds = new Discord.MessageEmbed()
          .setColor("#ff7e00")
          .setDescription(
            `${nev.author} , **Mesajı editleyip reklam yapmak mı ?**`
          );
        client.channels.cache.get(y).send(embed);
        nev.channel.send(embeds).then(msg =>
          msg.delete({
            timeout: 5000
          })
        );
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);

  let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
  if (i) {
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
          msg.delete({
            timeout: 750
          });
          const embeds = new Discord.MessageEmbed()
            .setColor("#ff7e00")
            .setDescription(
              `<@${msg.author.id}> , **Dostum Lütfen reklam yapma**`
            );
          msg.channel.send(embeds).then(msg =>
            msg.delete({
              timeout: 5000
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

////////////////////////////////////////////////////////////////////////////////////////// KÜFÜR ENGEL
const küfür = [
  "oç",
  "amcık",
  "amk",
  "yarrak",
  "ananı sikiyim",
  "s1kim",
  "siktir",
  "siktirgit",
  "döl",
  "s1k",
  "orsbu",
  "tten",
  "s2cem",
  "s2k",
  "sik",
  "göt",
  "pezevenk",
  "s1krm",
  "skrm",
  "orsbu",
  "fuck",
  "orosbu çocuğu",
  "oç",
  "sikiyim",
  "piç",
  "yavşak",
  "sikimi ye",
  "aq",
  "mq",
  "götveren",
  "şerefsiz",
  "kahpe",
  "yarram",
  "gavat",
  "pezevenk",
  "kes mq"
];

client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
    if (i) {
      if (küfür.some(word => nev.content.includes(word))) {
        if (nev.member.hasPermission("BAN_MEMBERS")) return;
        //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
        const embed = new Discord.MessageEmbed()
          .setColor("#ff7e00")
          .setDescription(
            `${nev.author} , **Ben varken küfürmü etmeye çalıştın?**`
          )
          .addField("Küfür:", nev);

        nev.delete();
        const embeds = new Discord.MessageEmbed()
          .setColor("#ff7e00")
          .setDescription(
            `${nev.author} , **Mesajı editleyip küfür etmekmi?**`
          );
        client.channels.cache.get(y).send(embed);
        nev.channel.send(embeds).then(msg =>
          msg.delete({
            timeout: 5000
          })
        );
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

  let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
  if (i) {
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete({
            timeout: 750
          });
          const embeds = new Discord.MessageEmbed()
            .setColor("#ff7e00")
            .setDescription(
              `<@${msg.author.id}> , **Dostum Lütfen küfür etme!**`
            );
          msg.channel.send(embeds).then(msg =>
            msg.delete({
              timeout: 5000
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

////////////////////////////////////////////////////////////////////////////////////////// GİRİŞ ÇIKIŞ MESAJI
client.on('guildMemberAdd', async member => {
  let member2 = member.user 
  let zaman = new Date().getTime() - member2.createdAt.getTime()
  var user = member2 
  var takizaman = [];
  const kullanıcıadı = member.user.username.replace(/\W/g, "");
  if(zaman < 604800000) {
  takizaman = 'Tehlikeli bilader, a desen seni bıçaklar'
  } else {
  takizaman = `Güvenli, gizli sırrımızı öğrenebilir`}require("moment-duration-format");
    let zaman1 = new Date().getTime() - user.createdAt.getTime()
    const gecen = moment.duration(zaman1).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
    let message = member.guild.channels.cache.find(x => x.id === `839308306676711437`) //id yazan kısma kanal id'si [orn: register-chat]
     const taki = new Discord.MessageEmbed()
      .setTitle("StorikaNW Hoşgeldin")
      .setDescription(`:loudspeaker: Uzaklardan bir steve belirdi...Aramıza hoşgeldin **${kullanıcıadı}** 
       Seninle Beraber **${message.guild.memberCount}** Kişiyiz.`)
      .setThumbnail(client.user.avatarURL())
      .setColor('#76FF03')
      message.send(taki)
    
            });
  
  ////////////////////////////////////////////////////////////////////////////////////////// GİRİŞ ÇIKIŞ MESAJI
  client.on('guildMemberRemove', async member => {
  let member2 = member.user 
  let zaman = new Date().getTime() - member2.createdAt.getTime()
  var user = member2 
  var takizaman = [];
  const kullanıcıadı = member.user.username.replace(/\W/g, "");
  if(zaman < 604800000) {
  takizaman = 'Tehlikeli bilader, a desen seni bıçaklar'
  } else {
  takizaman = `Güvenli, gizli sırrımızı öğrenebilir`}require("moment-duration-format");
    let zaman1 = new Date().getTime() - user.createdAt.getTime()
    const gecen = moment.duration(zaman1).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
    let message = member.guild.channels.cache.find(x => x.id === `839306378736828456`) //id yazan kısma kanal id'si [orn: register-chat]
     const taki = new Discord.MessageEmbed()
      .setTitle("StorikaNW Güle Güle")
      .setDescription(`:loudspeaker: Aramızdan bir steve ayrıldı...Güle Güle **${kullanıcıadı}** 
       Sunucuda **${message.guild.memberCount}** kişi kaldı.`)
      .setThumbnail(client.user.avatarURL())
      .setColor('RED')
      message.send(taki)
  });
////////////////////////////////////////////////////////////////////////////////////////// OTOROL
client.on("guildMemberAdd", async member => {
  if (db.has(`${member.guild.id}_otorol`)) {
    var rolID = db.fetch(`${member.guild.id}_otorol`);
    member.roles.add(rolID);
  } else {
    return;
  }
  if (db.has(`${member.guild.id}_otokanal`)) {
    var kanal = client.channels.cache.get(
      db.fetch(`${member.guild.id}_otokanal`)
    );
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `Yeni katılan ${member} kullanıcısına <@&${rolID}> rolü verildi`
      )
      .setTimestamp();
    kanal.send(embed);
  } else {
    return;
  }
});
//////////////////////////////////////////////////////////////////////// DAVET
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(codare => {
      invites[g.id] = codare;
    });
  });
});

client.on("guildMemberAdd", async member => {// chimp#0110
const data = require('quick.db')
const user = client.users.cache.get(member.id);
  
member.guild.fetchInvites().then(async codare => {
let channel = await data.fetch(`kanal.${member.guild.id}`);
if (!channel) return;

const ei = invites[member.guild.id];
invites[member.guild.id] = codare;

const seni_kim_davet_etti = await codare.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
const ben_ettim = member.guild.members.cache.get(seni_kim_davet_etti.inviter.id);

data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, +1);
data.add(`toplambebeğiiiiim.${ben_ettim.id}.${member.guild.id}`, +1);
  
 let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())
 if(zaman < 1296000000) { data.add(`chimp.${ben_ettim.id}.${member.guild.id}`, -1);
 data.add(`fake.${ben_ettim.id}_${member.guild.id}`, +1); }
  
 data.set(`seni_kim_davet_etti?.${member.id}.${member.guild.id}`, ben_ettim.id);
  
let ölç_bakalım = await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`);

let davetsayi_
if(!ölç_bakalım) { davetsayi_= 0; } 
else { davetsayi_= await data.fetch(`chimp.${ben_ettim.id}.${member.guild.id}`); }
  
if(zaman < 1296000000){
member.guild.channels.cache.get(channel).send(`**${member.user.username}** (**fake**), sunucuya katıldı  **${ben_ettim.user.tag}** (**${davetsayi_}**)  davet sayısına ulaştı.`);
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna sizin sayenizde giriş yaptı.
Kullanıcı fake olduğu için davet sayınız güncellenmedi.`)
} else {
member.guild.channels.cache.get(channel).send(`**${member.user.username}**, sunucuya katıldı **${ben_ettim.user.tag}** (**${davetsayi_}**)  davet sayısına ulaştı.`);
ben_ettim.send(`**${member.user.username}** isimli kullanıcı **${member.guild.name}** sunucusuna sizin sayenizde giriş yaptı.
Yeni davet sayınız **${davetsayi_}** olarak güncellendi.`)
  }});
});// codare

////////////////////////////////////////////////////////////////////////  MODERASYON KOMUTLARI
client.on('channelCreate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n► ID: ${channel.id}`)
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
                    .setColor("GOLD")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.MessageEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n��� ID: ${channel.id}`)
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
                    .setColor("GOLD")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\n► ID: ${channel.id}`)
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
                    .setColor("GOLD")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n► ID: ${emoji.id}`)
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
                    .setColor("GOLD")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n► ID: ${emoji.id}`)
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
                    .setColor("GOLD")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
                    .setColor("GOLD")
                    .setFooter(`**StorikaNW Mod Log Sistemi**`)

    c.send(embed)
    });
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.cache.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
                    .setTitle("MESAJ SİLİNDİ") 
                    .addField("Kullanıcı:", `${message.author}`)               
                    .addField(`Silinen mesaj : ${message.content}`,`**Kanal:** **${message.channel.name}**`)
                    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
                    .setTimestamp()
                    .setColor("GOLD")
                    .setFooter("StorikaNW Mod Log Sistemi")

    channel.send(embed)
});

client.on("messageDelete", async(message) => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
let snipe = {
mesaj: message.content,
mesajyazan: message.author.id,
ytarihi: message.createdTimestamp,
starihi: Date.now(), 
kanal: message.channel.id
}
await db.set(`snipe.${message.guild.id}`, snipe)
}); 


client.on('messageUpdate', async(oldMessage, newMessage, message) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.cache.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.MessageEmbed()
    .setTitle("MESAJ GÜNCELLENDİ!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .addField("Düzenleyen :", `${oldMessage.author.username}#${oldMessage.client.user.discriminator}`)
    .setFooter("StorikaNW Mod Log Sistemi")
    
    .setTimestamp()
    .setColor("GOLD")

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
.setColor("GOLD")
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setThumbnail("https://cdn.discordapp.com/avatars/814934914381381682/5f3b66c0c6d0f4c92d191a8f5afd632c.webp")
.setColor("GOLD")
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
/////////////////////////////////////////////////////////////////////////

////////////// TEKNİK KOMUTLAR (ELLEME BOZABİLİRSİN.)
require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};
//////////////////////////////////////////////////////////////////////////////////////////

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
