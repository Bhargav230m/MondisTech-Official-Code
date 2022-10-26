const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
} = require("discord.js");
const link = "[INVITE ME](https://discord.com/api/oauth2/authorize?client_id=1028536734553739293&permissions=1110517509238&scope=bot%20applications.commands)";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Sends a invite link to the channel of this bot."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const invite = new EmbedBuilder()
      .setAuthor({ name: "My invite Link" })
      .setDescription(`${link}`)
      .setColor("Random");

    interaction.reply({ embeds: [invite], ephemeral: false });
  },
};
