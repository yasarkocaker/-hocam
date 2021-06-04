const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
exports.run = async (client, message, args) => {
  const filter = (reaction, user) => {
    return (
      ["🏠", "💬", "🎉","💎","💼","🛠️",].includes(reaction.emoji.name) &&
      user.id === message.author.id &&
      reaction.users.remove(message.author.id)
    );
  };

  const yardım = new Discord.MessageEmbed()
    .setColor("#00d0d0")
    .setTitle("StorikaNW Yardım Menüsü")
    .setImage(
      "https://media.discordapp.net/attachments/839317679080472606/845665864266285116/standard_2.gif"
    )
    .setDescription(
      `**Ana Menü 🏠 \n Genel Komutlar 💬 \n Eğlence Komutları 🎉 \n VIP Bilgi Komutları 💎 \n Moderasyon Komutları 💼 \n Yönetici Komutları 🛠️ **`
    );
  var menü = await message.channel.send(yardım);
  const collector = menü.createReactionCollector(filter, { time: 900000 });
  let emojiler = ["🏠", "💬", "🎉","💎","💼","🛠️"];
  await menü.react(emojiler[0]);
  await menü.react(emojiler[1]);
  await menü.react(emojiler[2]);
  await menü.react(emojiler[3]);
  await menü.react(emojiler[4]);
  await menü.react(emojiler[5]);

  // GENEL BAŞ
  collector.on("collect", (reaction, user) => {
    if (reaction.emoji.name == "💬") {
      const genels = new Discord.MessageEmbed()
        .setColor("#00d0d0")
        .setTitle("GENEL Komutlar")
        .addField("`usage`","Komutların kullanım şeklini gösterir")
        .addField("`ip`","Sunucunun ip adresini verir.")
        .addField("`site`","Site linkini verir")
        .addField("`destek`", "Desteğin linkini verir.")
        .addField("`event`", "Günlük event saatini gösterir.")
        .addField("`ök`", "özel sesli kanal açar.")
        .addField("`snipe`", "Silinen son mesajı gösterir.")
        .addField("`storika`", "Sunucunun oyun içindeki görselini gösterir")
        .addField("`rolliste`", "Suncuudaki Tüm rolleri listeler.")
        .addField("`skin`", "Girilen kullanıcı adınının skinini gösterir.")
        .setImage("https://media.discordapp.net/attachments/839317679080472606/845665864266285116/standard_2.gif")
        .setFooter("Ana Menüye geri dönmek için 🏠 emojisine tıklayınız. ");
      menü.edit(genels);
    }
    if (reaction.emoji.name == "🏠") {
      menü.edit(yardım);
    }
  });

  // GENEL SON

  //Vipbilgi baş
  collector.on("collect", (reaction, user) => {
    if (reaction.emoji.name == "💎") {
      const vips = new Discord.MessageEmbed()
        .setColor("#00d0d0")
        .setTitle("VIP Komutları")
        .addField("`vip`", "VIP hakkında bilgiler verir.")
        .addField("`svip`", "SVIP hakkında bilgiler verir.")
        .addField("`svip+`", "SVIP+ hakkında bilgiler verir.")
        .addField("`storikavip`", "StorikaVIP hakkında bilgiler verir.")
        .setImage("https://media.discordapp.net/attachments/839317679080472606/845665864266285116/standard_2.gif")
        .setFooter("Ana Menüye geri dönmek için 🏠 emojisine tıklayınız.");
      menü.edit(vips);
    }
    if (reaction.emoji.name == "🏠") {
      menü.edit(yardım);
    }
  });

  //Vipbilgi Son

  // EĞLENCE BAŞ
  collector.on("collect", (reaction, user) => {
    if (reaction.emoji.name == "🎉") {
      const eglence = new Discord.MessageEmbed()
        .setColor("#00d0d0")
        .setTitle("EĞLENCE Komutları")
        .addField( "Kelime Oyunu", "\n `top10` = Kelime oyunundaki en yüksek puana sahip 10 kişiyi gösterir. \n `puanım` = Kelime oyunundaki puanınızı gösterir. \n `puansıfırla` = Kelime oyunundaki puanları sıfırlar.")
        .addField("`adamasmaca`", "Adam asmaca oynarsınız.")
        .addField("`snake`", "Discord üzerinden yılan oyunu oynarsınız.")
        .addField("`ses`","Discord üzerinden çeşitli oyunlar oynayabilir , bot üzerinden youtubeden ortak video izleyebilirsiniz.")
        .setImage("https://media.discordapp.net/attachments/839317679080472606/845665864266285116/standard_2.gif")
        .setFooter("Ana Menüye geri dönmek için 🏠 emojisine tıklayınız. ");
      menü.edit(eglence);
    }
    if (reaction.emoji.name == "🏠") {
      menü.edit(yardım);
    }
  });
  // EĞLENCE SON

  // MODERASYON BAŞ
  collector.on("collect", (reaction, user) => {
    if (reaction.emoji.name == "💼") {
      const moderasyon = new Discord.MessageEmbed()
        .setColor("#00d0d0")
        .setTitle("**MODERASYON Komutları**")
        .addField("`sil`", "Miktarını girdiğiniz kadar mesaj siler.")
        .addField("`oylama`", "Oylama başlatır.")
        .addField("`çokluoylama`", "Birden fazla cevaplı oylama başlatır.")
        .addField("`çekiliş`", "Hızlı bir çekiliş yapar.")
        .addField("`profil`", "Kullanıcı bilgilerini gösterir.")
        .addField("`stats`", "Bot İstatistiklerini gösterir.")
        .addField("`gstats`", "Botun gelişmiş bir şekilde İstatistiklerini gösterir.")
        .addField("`rolbilgi`", "Sunucudaki roller hakkında bilgi verir.")
        .addField( "`yetkiler`", "Sunucudaki oyuncuların sahip olduğu yetkiyi gösterir.")
        .setImage( "https://media.discordapp.net/attachments/839317679080472606/845665864266285116/standard_2.gif")
        .setFooter("Ana Menüye geri dönmek için 🏠 emojisine tıklayınız. ");
      menü.edit(moderasyon);
    }
    if (reaction.emoji.name == "🏠") {
      menü.edit(yardım);
    }
  });
  //MODERASYON SON

  // YETKİLİ BAŞ 
  collector.on("collect", (reaction, user) => {
    if (reaction.emoji.name == "🛠️") {
      const yetkili = new Discord.MessageEmbed()
        .setColor("#00d0d0")
        .addField("`capsengel`", "Suncuda capslock kullanımını engeller.")
        .addField("`reklamengel`", "Suncuda reklam yapılmasını engeller.")
        .addField("`küfürengel`", "Suncuda küfür kullanımını engeller.")
        .addField("`duyuru`", "Bot üzerinden duyuru atar.")
        .addField("`yaz`", "Bot tarafından yazı gönderir.")
        .setTitle("**YÖNETİCİ Komutları**")
        .addField("`mute`", "Oyunculara mute atar.")
        .addField("`unmute`", "Oyuncuların mutesini kaldırır.")
        .addField("`sicil`", "Oyuncuların geçmişte aldığı muteleri gösterir")
        .addField("`sicilsıfırla`", "Oyuncuların geçmişte aldığı muteleri sıfırlar.")
        .setImage( "https://media.discordapp.net/attachments/839317679080472606/845665864266285116/standard_2.gif")
        .setFooter("Ana Menüye geri dönmek için 🏠 emojisine tıklayınız. ");
      menü.edit(yetkili);
    }
    if (reaction.emoji.name == "🏠") {
      menü.edit(yardım);
    }
  });

  // YETKİLİ SON
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help"],
  permLevel: 0,
  usage:prefix + 'help'
};

exports.help = {
  name: "yardım",
  description: "",
};
