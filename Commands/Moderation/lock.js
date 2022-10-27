const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const ml = require("../../Schemas/ModLogs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("locks channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Select a channel")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");

    const succesEmbed = new EmbedBuilder()
      .setColor(0xd98832)
      .setTitle(":lock: Locked!")
      .setDescription(`Channel succesfully locked.`);

    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: false,
      AttachFiles: false,
    });

    await interaction.reply({
      embeds: [succesEmbed],
    });
    const dat = await ml.findOne({ Guild: interaction.guild.id });
    if (!dat) {
      return interaction.reply({ embeds: [succesEmbed] });
    }
    const dchannel = await interaction.guild.channels.cache.get(dat.Channel);

    if (dat) {
      const embe = new EmbedBuilder()
        .setAuthor({ name: "ModLogs" })
        .setDescription(`${channel} was locked by <@${interaction.member.id}>`)
        .setColor("Random");
      dchannel.send({ embeds: [embe] });
    }
  },
};
