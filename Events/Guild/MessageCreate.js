const {
  GuildMember,
  InteractionCollector,
  Client,
  EmbedBuilder,
} = require("discord.js");

const Schema = require("../../Schemas/Chatbot");
const User = require("../../Schemas/User.js");

const cooldown = new Set();
const axios = require("axios");
module.exports = {
  name: "messageCreate",
  /**
 * 

 * @param {Client} client 
 */
  async execute(message, client) {


  

    //chatbot
    const data = Schema.findOne(
      { Guild: message.guild.id },
      async (err, data) => {
        if (!data) {
          return;
        }
        if (message.channel.id !== data.Channel) return;

        const chatbot = message.guild.channels.cache.get(data.Channel);
                
        try {
          if (!message.guild) return;
          if (message.author.bot) return;
          const res = await axios.get(
            `
            http://api.brainshop.ai/get?bid=170102&key=eSh1QCThZ8qIugQA&uid=1&msg=${encodeURIComponent(message.content)}`
          );
          await chatbot.send({
            content: `<@${message.author.id}> ${res.data.cnt}`,
            });
        } catch (err) {
          console.log(err);
          message.channel.send("Oops, something went wrong!");
        }
      }
    );


    //rank
      const guildId = message.guild.id;
      const userId = message.author.id;
  
      if (message.author.bot || !message.guild) return;
      if (cooldown.has(userId)) return;
  
      let user;
  
      try {
        const xpAmount = Math.floor(Math.random() * (25 - 15 + 1) + 15);
  
        user = await User.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $inc: { xp: xpAmount },
          },
          { upsert: true, new: true }
        );
  
        let { xp, level } = user;
  
        if (xp >= level * 100) {
          ++level;
          xp = 0;
  
          await User.updateOne(
            {
              guildId,
              userId,
            },
            {
              level,
              xp,
            }
          );
  
          message.reply(`🎉 <@${userId}>, you are now level ${level}!`);
        }
      } catch (err) {
        console.log(err);
      }
  
      cooldown.add(message.author.id);
  
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 60 * 1000);


  },
};
