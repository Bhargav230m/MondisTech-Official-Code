const ml = require("../../../Schemas/ModLogs");

module.exports = {
  subCommand: "enable.modlogs",

  async execute(interaction) {
    const { options } = interaction;
    const channel = options.getChannel("channel");

    if (!channel) {
      await interaction.reply({ content: "Please enter the channel" });
    }

    const data = await ml.findOne({ Guild: interaction.guild.id });
    if (!data) {
      await ml.create({
        Guild: guild.id,
        Channel: channel.id,
      });
      interaction.reply({ content: "Successfully activated modlogs" });
    }
    if (data) {
      return interaction.reply({ content: "Its already enabled" });
    }
  },
};
