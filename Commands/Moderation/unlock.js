const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
  } = require("discord.js");
  const ml = require("../../Schemas/ModLogs")
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("unlock")
      .setDescription("unlock channel")
      .addChannelOption((option) =>
        option.setName("channel").setDescription("Select a channel")
        .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
    async execute(interaction) {
      const channel = interaction.options.getChannel("channel");
  
      const succesEmbed = new EmbedBuilder()
        .setColor(0xd98832)
        .setTitle(":unlock: Unlock!")
        .setDescription(`Channel succesfully unlocked.`);
  
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: true,
        AttachFiles: true,
      });
  
    

      await interaction.reply({
        embeds: [succesEmbed],
      })
      const dat = await ml.findOne({ Guild: guild.id });
      if(!dat) {
        return interaction.reply({ embeds: [succesEmbed]})
      }
      const dchannel = await guild.channels.cache.get(dat.Channel);
      
      if(dat) {
        const embe = new EmbedBuilder()
        .setAuthor({name: "ModLogs"})
        .setDescription(`${channel} was unlocked`)
        .setColor("Random")
        dchannel.send({ embeds: [embe] })
      }
    },
  };